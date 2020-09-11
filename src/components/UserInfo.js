import {
    profileName,
    profileInfo,
    groupID,
    authorization,
    profilePhoto
} from "../utils/constants.js"
import PopupWithForm from "./PopupWithForm.js"

export default class UserInfo {
    constructor(user, api) {
        this._userName = user.name;
        this._userText = user.text;
        this._api = api;
        
    }

    getProfileInfo() {
        const name = profileName;
        const text = profileInfo;

        return {name, text}
    }

    setPhoto(formData) {
        profilePhoto.src = formData.link;
        this._api.updateUserImage(formData.link);
    }

    setEventListeners() {
        profilePhoto.addEventListener('click', () => {
            const edit = new PopupWithForm({
                handleFormSubmit: (formData) => {
                    this.setPhoto(formData)
                    edit.close();
                }
            }, '.popup-photo', 'popup__form')
            edit.setEventListeners();
            edit.open();
        })
    }

    setProfile(formData) {
        profileName.textContent = formData.text;
        profileInfo.textContent = formData.about;
        return this._api.updateProfileData(formData.text, formData.about);
    }
}