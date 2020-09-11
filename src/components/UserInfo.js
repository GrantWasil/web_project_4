import {
    profileName,
    profileInfo,
    groupID,
    authorization,
    profilePhoto
} from "../utils/constants.js"
import PopupWithForm from "./PopupWithForm.js"

export default class UserInfo {
    constructor(user) {
        this._userName = user.name;
        this._userText = user.text;
    }

    getProfileInfo() {
        const name = profileName;
        const text = profileInfo;

        return {name, text}
    }

    setPhoto(formData) {
        profilePhoto.src = formData.link;
        fetch(`https://around.nomoreparties.co/v1/${groupID}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar: formData.link
            })
        })
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
        return fetch(`https://around.nomoreparties.co/v1/${groupID}/users/me`, {
            method: "PATCH",
            headers: {
                authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: `${formData.text}`,
                about: `${formData.about}`
            })
        })
    }
}