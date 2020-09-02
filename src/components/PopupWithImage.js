import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
    constructor(text, link, popupSelector) {
        super(popupSelector);
        this._text = text;
        this._link = link;
    }

    open(){
        const popupElement = this._getElement();
        document.addEventListener('keydown', this._handleEscapeClose);
        popupElement.querySelector('.picture__container-image').src = this._link;
        popupElement.querySelector('.picture__container-image').alt = `Image of ${this._text}`;
        popupElement.querySelector('.picture__container-title').textContent = this._text;
        popupElement.classList.add('popup_opened');
    }
}