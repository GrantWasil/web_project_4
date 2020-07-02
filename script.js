const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.btn-edit');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');
const profileName = profile.querySelector('.profile__info-name');
const profileInfo = profile.querySelector('.profile__info-title');
const popupName = popup.querySelector('.popup__container-name');
const popupAbout = popup.querySelector('.popup__container-about');
const saveButton = popup.querySelector('.popup__container-save');

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




