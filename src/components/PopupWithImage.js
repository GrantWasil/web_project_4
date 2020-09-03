import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
    constructor(text, link, popupSelector) {
        super(popupSelector);
        this._text = text;
        this._link = link;
    }

    open(){
        document.addEventListener('keydown', this._handleEscapeClose);
        this._popupElement.querySelector('.picture__container-image').src = this._link;
        this._popupElement.querySelector('.picture__container-image').alt = `Image of ${this._text}`;
        this._popupElement.querySelector('.picture__container-title').textContent = this._text;
        super.open()
    }
}