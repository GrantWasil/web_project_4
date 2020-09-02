import Popup from "./Popup.js";

import {
    overlay
} from "../utils/constants.js"

export default class PopupWithForm extends Popup {
    constructor({handleFormSubmit}, popupSelector, formSelector) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formSelector = formSelector
    }

    open() {
        this._getElement()
            .classList
            .add('popup_opened');
            
        this._getElement()
            .querySelector('.popup__container-save')
            .classList
            .add('popup__container-save_inactive')
    }
    
    _getInputValues() {
        this._inputList = this._getElement().querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    _reset() {
        this._inputList = this._getElement().querySelectorAll('.popup__input');
        this._inputList.forEach((input) => {
            input.value = '';
        })
    }

    setEventListeners() {
        const closeButton = this._getElement().querySelector('.popup__close');
        const formElement = this._getElement().querySelector('.popup__form');
        const popupOverlay = this._getElement().querySelector(overlay);
        closeButton.addEventListener('click', () => {
            this.close();
        })

        popupOverlay.addEventListener('click', () => {
            this.close();
        })

        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleFormSubmit(this._getInputValues());

            this._reset();
        })
    }
    
}