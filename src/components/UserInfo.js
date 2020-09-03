import {
    profileName,
    profileInfo
} from "../utils/constants.js"

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

    setProfile(formData) {
        profileName.textContent = formData.text;
        profileInfo.textContent = formData.about;
    }
}