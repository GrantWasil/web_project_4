const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.btn-edit');
const newButton = profile.querySelector('.btn-new');
const profileName = profile.querySelector('.profile__info-name');
const profileInfo = profile.querySelector('.profile__info-title');
const elementsContainer = document.querySelector('.elements');
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

const updateProfile = (popupName, popupAbout) => {
	profileName.textContent = popupName; 
	profileInfo.textContent = popupAbout;
}

const addElement = (nameValue, linkValue) => {
	const elementTemplate = document.querySelector('#element').content;
	const newElement = elementTemplate.cloneNode(true);

	newElement.querySelector('.element__image').src = linkValue;
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

	elementsContainer.append(newElement);
}

const addPopup = (titleValue, namePlaceholder, aboutPlaceholder, saveFunction, defaultName="", defaultAbout="") => {
	const popupTemplate = document.querySelector('#popup').content;
	const newPopup = popupTemplate.cloneNode(true);
	const name = newPopup.querySelector('.popup__container-name');
	const about = newPopup.querySelector('.popup__container-about');

	newPopup.querySelector('.popup__container-title').textContent = titleValue;
	name.placeholder = namePlaceholder;
	name.value = defaultName;
	about.placeholder = aboutPlaceholder;
	about.value = defaultAbout;
	const closeButton = newPopup.querySelector('.popup__close');
	const saveButton = newPopup.querySelector('.popup__container-save');

	closeButton.addEventListener('click', () => {
		const targetPopup = closeButton.closest('.popup');
		targetPopup.remove();
	})

	saveButton.addEventListener('click', (e) => {
		const targetPopup = saveButton.closest('.popup');
		const popupName = targetPopup.querySelector('.popup__container-name');
		const popupAbout = targetPopup.querySelector('.popup__container-about');
		e.preventDefault();
		saveFunction(popupName.value, popupAbout.value);
		targetPopup.remove();
	})

	pageContainer.append(newPopup);
}

editButton.addEventListener('click', () => {
	addPopup('Edit Profile', 'Name', 'About Me', updateProfile, profileName.textContent, profileInfo.textContent);
});

newButton.addEventListener('click', () => {
	addPopup('New Place', 'Title', 'Image URL', addElement);
})

initialCards.forEach((card) => {
	addElement(card.name, card.link);
})

