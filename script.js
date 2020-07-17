const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.btn-edit');
const newButton = profile.querySelector('.btn-new');
const profileName = profile.querySelector('.profile__info-name');
const profileInfo = profile.querySelector('.profile__info-title');
const editPopup = document.querySelector('.popup-edit');
const newPopup = document.querySelector('.popup-new');
const editClose = editPopup.querySelector('.popup__close');
const newClose = newPopup.querySelector('.popup__close');
const editSave = editPopup.querySelector('.popup__container-save');
const newSave = newPopup.querySelector('.popup__container-save');
const elementsContainer = document.querySelector('.elements');
const picture = document.querySelector('.picture');
const pictureClose = document.querySelector('.picture__container-close');
const pageContainer = document.querySelector('.page');
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

const updateProfile = (evt) => {
	evt.preventDefault();
	const popupName = editPopup.querySelector('.popup__container-name').value;
	const popupAbout = editPopup.querySelector('.popup__container-about').value;
	profileName.textContent = popupName; 
	profileInfo.textContent = popupAbout;
	editPopup.classList.toggle('popup_opened');
}

const addElement = (nameValue, linkValue) => {
	const elementTemplate = document.querySelector('#element').content;
	const newElement = elementTemplate.cloneNode(true);
	const image = newElement.querySelector('.element__image'); 

	image.src = linkValue;
	newElement.querySelector('.element__info-name').textContent = nameValue;
	const likeButton = newElement.querySelector('.element__info-like');
	const trashButton = newElement.querySelector('.element__delete');


	likeButton.addEventListener('click', (e) => {
		e.target.classList.toggle('element__info-like_active');
		e.target.classList.toggle('element__info-like');
	})

	trashButton.addEventListener('click', () => {
		const targetElement = trashButton.closest('.element');
		targetElement.remove();
	})

	image.addEventListener('click', () => {
		editPicture(nameValue, linkValue);
		document.querySelector('.picture').classList.toggle('picture_active');
	})

	newElement.querySelector('.element').classList.add('fade-in')
	elementsContainer.append(newElement);
}

const editPicture = (nameValue, linkValue) => {
	const pictureTitle = document.querySelector('.picture__container-title');
	const pictureUrl = document.querySelector('.picture__container-image');

	pictureTitle.textContent = nameValue;
	pictureUrl.src= linkValue;
}

initialCards.forEach((card) => {
	addElement(card.name, card.link);
})

editButton.addEventListener('click', () => editPopup.classList.toggle('popup_opened'));
editClose.addEventListener('click', () => editPopup.classList.toggle('popup_opened'));
editSave.addEventListener('click', (e) => {
	updateProfile(e);
});

newButton.addEventListener('click', () => newPopup.classList.toggle('popup_opened'));
newClose.addEventListener('click', () => newPopup.classList.toggle('popup_opened'));
newSave.addEventListener('click', (e) => {
	const newNameValue = newPopup.querySelector('.popup__container-name').value;
	const newLinkValue = newPopup.querySelector('.popup__container-about').value;
	e.preventDefault();
	addElement(newNameValue, newLinkValue);
	newPopup.classList.toggle('popup_opened');
});

pictureClose.addEventListener('click', () => picture.classList.toggle('picture_active'));



