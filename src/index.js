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
    editButton,
    profileName,
    profileInfo,
    profilePhoto,
    profileNameText,
    profileInfoText,
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
  }).then()

api.getInitialCards()
.then((data) => {
items = data;
const defaultCardList = new Section({
    data: items,
    renderer: (item) => {
        const card = new Card(item, '#element')
        const cardElement = card.generateCard();
        if (item.owner.name != profileName.textContent) {
            cardElement.querySelector('.element__delete').remove()
        }
        if (item.likes.some(like => like.name === profileName.textContent)) {
            cardElement.querySelector('.element__info-like').classList.add('element__info-like_active');
        }
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
        const popupSave = document.querySelector('.popup__container-save');
        const card = new Card(formData, '#element');
        const cardElement = card.generateCard();
        newCardSection.addItem(cardElement)
        popupSave.textContent = "Saving..." 
        api.createNewCard(formData.name, formData.link)
            .then(() => {
                newPopup.close()
                popupSave.textContent = "Save"
            });
    }
}, '.popup-new', '.popup__form')


const editPopup = new PopupWithForm({
    handleFormSubmit: (formData) => {
        const popupSave = document.querySelector('.popup__container-save');
        popupSave.innerHTML = "Saving..."
        userProfile.setProfile(formData)
        .then(() => {
            editPopup.close()
            popupSave.innerHTML = "Save";
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


      

