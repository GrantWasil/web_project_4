import "./index.css";
import Card from "./components/Card";
import FormValidator from "./components/FormValidator";
import PopupWithForm from "./components/PopupWithForm.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import {
    items,
    elementsContainer,
    formButtons,
    profileNameText,
    profileInfoText
} from "./utils/constants.js"

const userProfile = new UserInfo({profileNameText, profileInfoText})

const defaultCardList = new Section({
    data: items,
    renderer: (item) => {
        const card = new Card(item, '#element')
        const cardElement = card.generateCard();
        defaultCardList.addItem(cardElement);
    }
}, elementsContainer);


/** Could you help me a little bit with how I could refactor this code? I totally agree that
 * it's messy and I don't like it. But I need to change the callback functions depending on 
 * which form it is. I think I made all of the other changes you wanted! THANK YOU SO MUCH!
*/
formButtons.forEach((button) => {
    if (button.isNew) {
        document.querySelector(button.formClass).addEventListener('click', () => {
            const form = new PopupWithForm({
                handleFormSubmit: (formData) => {
                    const card = new Card(formData, '#element');
                    const cardElement = card.generateCard();
                    defaultCardList.addItem(cardElement)
                    form.close();
                }
            }, '.popup-new', '.popup__form')
            form.setEventListeners();
            form.open();
        })
        
    } else {
        document.querySelector(button.formClass).addEventListener('click', () => {
            const form = new PopupWithForm({
                handleFormSubmit: (formData) => {
                    userProfile.setProfile(formData)
                    form.close();
                }
            }, '.popup-edit', 'popup__form')
            form.setEventListeners();
            form.open();
        })
    }
})



defaultCardList.renderItems();


