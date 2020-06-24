let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.btn__edit');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close');
let profileName = profile.querySelector('.profile__info-name');
let profileInfo = profile.querySelector('.profile__info-title');
let popupName = popup.querySelector('.popup__container-name');
let popupAbout = popup.querySelector('.popup__container-about');
let saveButton = popup.querySelector('.popup__container-save');

popupName.value = profileName.innerHTML;
popupAbout.value = profileInfo.innerHTML;

function popupToggle() {
	popup.classList.toggle('popup_opened');
}

function updateProfile() {
	profileName.textContent = popupName.value; 
	profileInfo.textContent = popupAbout.value;
	popupToggle();
}

editButton.addEventListener('click', popupToggle);
closeButton.addEventListener('click', popupToggle);
saveButton.addEventListener('click', updateProfile);




