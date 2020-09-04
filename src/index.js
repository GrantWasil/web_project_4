import "./index.css";
import Card from "./components/Card";
import FormValidator from "./components/FormValidator";
import PopupWithForm from "./components/PopupWithForm.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import {
    items,
    elementsContainer,
    newButton,
    editButton,
    profileNameText,
    profileInfoText
} from "./utils/constants.js"

const userProfile = new UserInfo({profileNameText, profileInfoText})

/**
 *  Semyon!! Thank you SO MUCH. I'm sorry that I asked you for help, I didn't realize that I 
 *  couldn't do that anymore. This code looks much better, and I feel like I undestand how
 *  to handle this in the future. Going to write about how helpful you were in slack right
 *  now. Thank you so much
 */

const defaultCardList = new Section({
    data: items,
    renderer: (item) => {
        const card = new Card(item, '#element')
        const cardElement = card.generateCard();
        defaultCardList.addItem(cardElement);
    }
}, elementsContainer);

const newPopup = new PopupWithForm({
    handleFormSubmit: (formData) => {
        const card = new Card(formData, '#element');
        const cardElement = card.generateCard();
        defaultCardList.addItem(cardElement)
        newPopup.close();
    }
}, '.popup-new', '.popup__form')


const editPopup = new PopupWithForm({
    handleFormSubmit: (formData) => {
        userProfile.setProfile(formData)
        editPopup.close();
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

defaultCardList.renderItems();


