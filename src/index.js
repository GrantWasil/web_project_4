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
    authorization,
    groupID,
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

fetch(`https://around.nomoreparties.co/v1/${groupID}/users/me`, {
    headers: {
        authorization
    }
})
  .then((res) => res.json())
  .then((data) => {
      profileName.textContent = data.name;
      profileInfo.textContent = data.about;
      profilePhoto.src = data.avatar;
  });

const userProfile = new UserInfo({profileNameText, profileInfoText})
userProfile.setEventListeners();

const newPopup = new PopupWithForm({
    handleFormSubmit: (formData) => {
        const popupSave = document.querySelector('.popup__container-save');
        const card = new Card(formData, '#element');
        const cardElement = card.generateCard();
        newCardSection.addItem(cardElement)
        popupSave.textContent = "Saving..." 
        fetch(`https://around.nomoreparties.co/v1/${groupID}/cards`, {
            method: "POST",
            headers: {
                authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: formData.name,
                link: formData.link
            })

        })
        .then(newPopup.close());
        popupSave.textContent = "Save"
    }
}, '.popup-new', '.popup__form')


const editPopup = new PopupWithForm({
    handleFormSubmit: (formData) => {
        const popupSave = document.querySelector('.popup__container-save');
        popupSave.innerHTML = "Saving..."
        userProfile.setProfile(formData)
        .finally(editPopup.close())
        popupSave.innerHTML = "Save"
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

const showInitalCards = (data) => {
items = data;
    
}

const handleReject = () => {
    console.log("test")
}

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
            defaultCardList.addItem(cardElement);
            }
    }, elementsContainer);
    defaultCardList.renderItems();
  })
  .catch((err) => {
      console.log(err);
  })
      

