/**
Okay, some pretty big changes here. First off, I want to apologise for not originally accepting your feedback.
For some reason, I thought that you were wanting us to declare classes and export them, and I was just confused.

I super appreciate your help, and I think that not only is my validation.js file what you were looking for, but 
it's also helping me become a stronger dev.

Again, I'm very sorry for the confusion. 

Grant
**/


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
const pictureTitle = picture.querySelector('.picture__container-title');
const pictureUrl = picture.querySelector('.picture__container-image');
const pictureClose = document.querySelector('.picture__container-close');
const pictureOverlay = picture.querySelector('.popup__overlay');
const pageContainer = document.querySelector('.page');
const elementTemplate = document.querySelector('#element').content;

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
	if (editName.value !== '' && editAbout.value !== '') {
		const popupName = editName.value;
		const popupAbout = editAbout.value;
		profileName.textContent = popupName; 
		profileInfo.textContent = popupAbout;
		togglePopup(editPopup);
	}
}

const addElement = (nameValue, linkValue) => {
	const newElement = elementTemplate.cloneNode(true);
	const image = newElement.querySelector('.element__image'); 

	image.src = linkValue;
	image.alt = `Image of ${nameValue}`;
	newElement.querySelector('.element__info-name').textContent = nameValue;
	const likeButton = newElement.querySelector('.element__info-like');
	const trashButton = newElement.querySelector('.element__delete');


	likeButton.addEventListener('click', (e) => {
		e.target.classList.toggle('element__info-like_active');
	})

	trashButton.addEventListener('click', () => {
		const targetElement = trashButton.closest('.element');
		targetElement.remove();
	})

	image.addEventListener('click', () => {
		editPicture(nameValue, linkValue);
		togglePopup(picture);
	})

	elementsContainer.prepend(newElement);
}

const editPicture = (nameValue, linkValue) => {
	pictureTitle.textContent = nameValue;
	pictureUrl.src= linkValue;
	pictureUrl.alt = `Photo of ${nameValue}`;
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

for(const {name, link} of initialCards){
	addElement(name, link);
}

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
	if (newName.value != '' && newAbout.value != '') {
		const newNameValue = newName.value;
		const newLinkValue = newAbout.value;
		addElement(newNameValue, newLinkValue);
		togglePopup(newPopup);
	}
});

handlePopup(pictureClose, picture);
handlePopup(pictureOverlay, picture);




