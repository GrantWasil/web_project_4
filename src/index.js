import "./index.css";
import Card from "./components/Card";
import FormValidator from "./components/FormValidator";
import PopupWithForm from "./components/PopupWithForm.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api.js";
import {
    elementsContainer,
    newButton,
    newSave,
    editButton,
    editSave,
    profileName,
    profileInfo,
    profilePhoto,
    profileNameText,
    profileInfoText
} from "./utils/constants.js"

let items;

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-4",
    headers: {
      authorization: "cf891b37-8c41-4e79-9006-bc8a3becbc32",
      "Content-Type": "application/json"
    }
  });

const newCardSection = new Section({
    data: items,
    renderer: (item) => {
        const card = new Card(item, '#element')
        const cardElement = card.generateCard();
        defaultCardList.addItem(cardElement);
    }
}, elementsContainer);



api.getProfileData()
  .then((data) => {
      profileName.textContent = data.name;
      profileInfo.textContent = data.about;
      profilePhoto.src = data.avatar;
      profileInfo.id = data._id;
  }).then()

api.getInitialCards()
.then((data) => {
items = data;
const defaultCardList = new Section({
    data: items,
    renderer: (item) => {
        const card = new Card(item, '#element')
        const cardElement = card.generateCard(profileInfo.id, item);
        defaultCardList.addItem(cardElement);
    }
}, elementsContainer);
defaultCardList.renderItems();
})
.catch((err) => {
    console.log(err);
})

const userProfile = new UserInfo({profileNameText, profileInfoText}, api)
userProfile.setEventListeners();

const newPopup = new PopupWithForm({
    handleFormSubmit: (formData) => {
        const card = new Card(formData, '#element');
        const cardElement = card.generateCard();
        newCardSection.addItem(cardElement)
        newSave.innerText = "Saving..." 
        api.createNewCard(formData.name, formData.link)
            .then(() => {
                newPopup.close()
                newSave.innerText = "Save"
            });
    }
}, '.popup-new', '.popup__form')


const editPopup = new PopupWithForm({
    handleFormSubmit: (formData) => {
        editSave.innerText = "Saving..."
        userProfile.setProfile(formData)
        .then(() => {
            editPopup.close()
            editSave.innerText = "Save";
        })
    }
}, '.popup-edit', 'popup__form')

editPopup.setEventListeners();
newPopup.setEventListeners();

newButton.addEventListener('click', () => {
    newPopup.open();
})

editButton.addEventListener('click', () => {
    editPopup.open();
})

const forms = [...document.querySelectorAll('.popup__form')]

forms.forEach((form) => {
	const validatedForm = new FormValidator({
		formSelector: ".popup__form",
		inputSelector: ".popup__input",
		submitButtonSelector: ".popup__container-save",
		inactiveButtonClass: "popup__container-save_inactive",
		inputErrorClass: "popup__input_type_error",
		errorClass: "popup__input-error_active"
	  }, form)
	validatedForm.enableValidation();
})


      

