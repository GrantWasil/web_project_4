import "./index.css";
import Card from "./components/Card";
import FormValidator from "./components/FormValidator";
import PopupWithForm from "./components/PopupWithForm.js";
import Section from "./components/Section.js";
import {
    items,
    elementsContainer,
    formButtons
} from "./utils/constants.js"


const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__info-name');
const profileInfo = profile.querySelector('.profile__info-title');

const defaultCardList = new Section({
    data: items,
    renderer: (item) => {
        const card = new Card(item, '#element')
        const cardElement = card.generateCard();
        defaultCardList.addItem(cardElement);
    }
}, elementsContainer);

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
                    profileName.textContent = formData.text;
                    profileInfo.textContent = formData.about;
                    form.close();
                }
            }, '.popup-edit', 'popup__form')
            form.setEventListeners();
            document
                .querySelector('.popup-edit')
                .querySelector('.popup__container-name').value = profileName.textContent
            document
                .querySelector('.popup-edit')
                .querySelector('.popup__container-about').value = profileInfo.textContent
            form.open();
        })
    }
})



defaultCardList.renderItems();


