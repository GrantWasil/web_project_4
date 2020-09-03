import {
    close,
    overlay
} from "../utils/constants.js"

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscapeClose)
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscapeClose)
    }

    _handleEscapeClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        const closeButton = this._popupElement.querySelector(close);
        const popupOverlay = this._popupElement.querySelector(overlay);
        closeButton.addEventListener('click', () => {
            this.close();
        })

        popupOverlay.addEventListener('click', () => {
            this.close();
        })

    }
}