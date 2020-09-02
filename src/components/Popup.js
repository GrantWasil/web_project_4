import {
    close,
    overlay
} from "../utils/constants.js"

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._getElement().classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscapeClose)
    }

    close() {
        this._getElement().classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscapeClose)
    }

    _handleEscapeClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _getElement() {
        const popupElement = document.querySelector(this._popupSelector);

        return popupElement;
    }

    setEventListeners() {
        const closeButton = this._getElement().querySelector(close);
        const popupOverlay = this._getElement().querySelector(overlay);
        closeButton.addEventListener('click', () => {
            this.close();
        })

        popupOverlay.addEventListener('click', () => {
            this.close();
        })

    }
}