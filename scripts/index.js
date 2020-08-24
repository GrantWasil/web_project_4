import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.btn-edit');
const newButton = profile.querySelector('.btn-new');
const profileName = profile.querySelector('.profile__info-name');
const profileInfo = profile.querySelector('.profile__info-title');
const editPopup = document.querySelector('.popup-edit');
const editName = editPopup.querySelector('.popup__container-name');
const editAbout = editPopup.querySelector('.popup__container-about');
const editClose = editPopup.querySelector('.popup__close');
const editForm = editPopup.querySelector('.popup__form');
const editOverlay = editPopup.querySelector('.popup__overlay');
const newPopup = document.querySelector('.popup-new');
const newName = document.querySelector('.popup__container-name');
const newAbout = document.querySelector('.popup__container-about');
const newClose = newPopup.querySelector('.popup__close');
const newForm = newPopup.querySelector('.popup__form');
const newOverlay = newPopup.querySelector('.popup__overlay');
const newSubmit = newPopup.querySelector('.popup__container-save');
const elementsContainer = document.querySelector('.elements');
const picture = document.querySelector('.picture');
const pictureClose = document.querySelector('.picture__container-close');
const pictureOverlay = picture.querySelector('.popup__overlay');


const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanois National Park",
        link: "https://code.s3.yandex.net/web-code/vanois.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];


const togglePopup = (popup) => {
    popup.classList.toggle('popup_opened'); 
    if (popup.classList.contains('popup_opened')) {
        document.addEventListener('keydown', handleEscape);
    } else {
        document.removeEventListener('keydown', handleEscape);
    }
}

const updateProfile = (evt) => {
	evt.preventDefault();
	if (editName.validity.valid && editAbout.validity.valid) {
		const popupName = editName.value;
		const popupAbout = editAbout.value;
		profileName.textContent = popupName; 
		profileInfo.textContent = popupAbout;
		togglePopup(editPopup);
	}
}

const handleEscape = (evt) => {
	if (evt.key === "Escape") {
		const currentPopup = document.querySelector('.popup_opened')
		togglePopup(currentPopup);
	}
};

const handlePopup = (buttonElement, popupElement) => {
	buttonElement.addEventListener('click', () => {
		togglePopup(popupElement);
	})
}

initialCards.forEach((item) => {
	const card = new Card(item, '#element', togglePopup);
	const cardElement = card.generateCard();

	elementsContainer.prepend(cardElement);
}) 

handlePopup(editClose, editPopup);
handlePopup(editOverlay, editPopup);
editButton.addEventListener('click', () => {
    editName.value = profileName.textContent;
    editAbout.value = profileInfo.textContent;
    togglePopup(editPopup);
})
editForm.addEventListener('submit', (e) => {
	updateProfile(e);
});

handlePopup(newClose, newPopup);
handlePopup(newOverlay, newPopup);
newButton.addEventListener('click', () => {
    newName.value = '';
    newAbout.value = '';
    newSubmit.classList.add('popup__container-save_inactive');
    togglePopup(newPopup);
})

newForm.addEventListener('submit', (e) => {
	if (newName.validity.valid && newAbout.validity.valid) {
		const name = newName.value;
		const link = newAbout.value;
		const newCard = new Card({name, link}, '#element');
		const newCardElement = newCard.generateCard();
		elementsContainer.prepend(newCardElement);
		togglePopup(newPopup);
	}
});

handlePopup(pictureClose, picture);
handlePopup(pictureOverlay, picture);




