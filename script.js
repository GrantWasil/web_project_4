const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.btn-edit');
const newButton = profile.querySelector('.btn-new');
const profileName = profile.querySelector('.profile__info-name');
const profileInfo = profile.querySelector('.profile__info-title');
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

const addEditPopup = () => {
	const popupTemplate = document.querySelector('#popup-edit').content;
	const newPopup = popupTemplate.cloneNode(true);
	const name = newPopup.querySelector('.popup__container-name');
	const about = newPopup.querySelector('.popup__container-about');
	const container = newPopup.querySelector('.popup-edit');

	newPopup.querySelector('.popup__container-title').textContent = 'Edit Profile';
	name.placeholder = 'Name';
	name.value = profileName.textContent;
	about.placeholder = 'About Me';
	about.value = profileInfo.textContent;
	const closeButton = newPopup.querySelector('.popup__close');
	const saveButton = newPopup.querySelector('.popup__container-save');

	closeButton.addEventListener('click', () => container.classList.toggle('popup_opened'));

	saveButton.addEventListener('click', (e) => {
		const targetPopup = saveButton.closest('.popup-edit');
		const popupName = targetPopup.querySelector('.popup__container-name');
		const popupAbout = targetPopup.querySelector('.popup__container-about');
		e.preventDefault();
		updateProfile(popupName.value, popupAbout.value);
		container.classList.toggle('popup_opened');
	});

	pageContainer.append(newPopup);
}

const addNewPopup = () => {
	const popupTemplate = document.querySelector('#popup-new').content;
	const newPopup = popupTemplate.cloneNode(true);
	const name = newPopup.querySelector('.popup__container-name');
	const about = newPopup.querySelector('.popup__container-about');
	const container = newPopup.querySelector('.popup-new');

	newPopup.querySelector('.popup__container-title').textContent = 'New Place';
	name.placeholder = 'Title';
	about.placeholder = 'Image URL';
	const closeButton = newPopup.querySelector('.popup__close');
	const saveButton = newPopup.querySelector('.popup__container-save');

	closeButton.addEventListener('click', () => container.classList.toggle('popup_opened'));

	saveButton.addEventListener('click', (e) => {
		const targetPopup = saveButton.closest('.popup');
		const popupName = targetPopup.querySelector('.popup__container-name');
		const popupAbout = targetPopup.querySelector('.popup__container-about');
		e.preventDefault();
		addElement(popupName.value, popupAbout.value);
		container.classList.toggle('popup_opened');
	});

	pageContainer.append(newPopup);
}

const updateProfile = (popupName, popupAbout) => {
	profileName.textContent = popupName; 
	profileInfo.textContent = popupAbout;
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
		targetElement.classList.add('fade-out')
		window.setTimeout(() => {
			targetElement.remove();
		}, 450)
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

addEditPopup();
addNewPopup();
initialCards.forEach((card) => {
	addElement(card.name, card.link);
})

editButton.addEventListener('click', () => document.querySelector('.popup-edit').classList.toggle('popup_opened'));
newButton.addEventListener('click', () => document.querySelector('.popup-new').classList.toggle('popup_opened'));
pictureClose.addEventListener('click', () => picture.classList.toggle('picture_active'));


