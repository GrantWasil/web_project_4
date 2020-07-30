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
const newAbout = document.querySelector('popup__container-about');
const newClose = newPopup.querySelector('.popup__close');
const newForm = newPopup.querySelector('.popup__form');
const newOverlay = newPopup.querySelector('.popup__overlay');
const elementsContainer = document.querySelector('.elements');
const picture = document.querySelector('.picture');
const pictureTitle = picture.querySelector('.picture__container-title');
const pictureUrl = picture.querySelector('.picture__container-image');
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
	const popupName = editName.value;
	const popupAbout = editAbout.value;
	profileName.textContent = popupName; 
	profileInfo.textContent = popupAbout;
	editPopup.classList.toggle('popup_opened');
}

const addElement = (nameValue, linkValue) => {
	const elementTemplate = document.querySelector('#element').content;
	const newElement = elementTemplate.cloneNode(true);
	const image = newElement.querySelector('.element__image'); 

	image.src = linkValue;
	image.alt = `Image of ${nameValue}`;
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
		picture.classList.toggle('picture_active');
	})

	elementsContainer.append(newElement);
}

const editPicture = (nameValue, linkValue) => {
	pictureTitle.textContent = nameValue;
	pictureUrl.src= linkValue;
	pictureUrl.alt = `Photo of ${nameValue}`;
}

for(const {name, link} of initialCards){
	addElement(name, link);
}

const togglePopup = (popup) => {
	popup.classList.toggle('popup_opened');
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(formElement, inputElement);
	}
}

const hasInvalidInput = (inputList) => {
	return inputList.some(inputElement => !inputElement.validity.valid) 
}

const toggleButtonState = (inputList, buttonElement) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add("popup__container-save_inactive");
		buttonElement.disabled = true;
	} else {
		buttonElement.classList.remove("popup__container-save_inactive");
		buttonElement.disabled = false;
	}
}

const setEventListeners = (formElement) => {
	const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
	const buttonElement = formElement.querySelector('.popup__container-save');

	toggleButtonState(inputList, buttonElement);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			checkInputValidity(formElement, inputElement);
			toggleButtonState(inputList, buttonElement);
		});
	});
}

const enableValidation = () => {
	const formList = Array.from(document.querySelectorAll('.popup__form'));
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', evt => evt.preventDefault());
		const fieldsetList = Array.from(formElement.querySelectorAll(".popup__field"));

		fieldsetList.forEach((fieldset) => {
			setEventListeners(fieldset);
		});
	});
}

editButton.addEventListener('click', () => togglePopup(editPopup));
editClose.addEventListener('click', () => togglePopup(editPopup));
editOverlay.addEventListener('click', () => togglePopup(editPopup));
editForm.addEventListener('submit', (e) => {
	updateProfile(e);
});
editPopup.addEventListener('keydown', (e) => {
	if (e.key === "Escape") {
		togglePopup(editPopup)
	}
})

newButton.addEventListener('click', () => togglePopup(newPopup));
newClose.addEventListener('click', () => togglePopup(newPopup));
newOverlay.addEventListener('click', () => togglePopup(newPopup));
newForm.addEventListener('submit', (e) => {
	const newNameValue = newName.value;
	const newLinkValue = newAbout.value;
	e.preventDefault();
	addElement(newNameValue, newLinkValue);
	newPopup.classList.toggle('popup_opened');
});

newPopup.addEventListener('keydown', (e) => {
	console.log("Test");
	if (e.key === "Escape") {
		togglePopup(newPopup)
	}
})

pictureClose.addEventListener('click', () => picture.classList.toggle('picture_active'));

enableValidation();

