import PopupWithImage from "./PopupWithImage";

export default class Card {
	constructor(data, templateElement) {
		this._text = data.text;
		this._link = data.link;
		this._templateElement = templateElement;
	}

	_getTemplate() {
		const cardElement = document
			.querySelector(this._templateElement)
			.content
			.cloneNode(true);
		return cardElement;
	}

	generateCard() {
		this._element = this._getTemplate();
		this._cardElement = this._element.querySelector('.element');
		const imageElement = this._element.querySelector('.element__image');
		this._setEventListeners();
		imageElement.src = this._link;
		imageElement.alt = `Image of ${this._text}`;
		this._element.querySelector('.element__info-name').textContent = this._text;

		return this._element;
	}

	_handleOpenPopup() {
		const popup = new PopupWithImage(this._text, this._link, '.picture');
		popup.setEventListeners();
		popup.open();
		
	}

	_setEventListeners() {
		this._element.querySelector('.element__image').addEventListener('click', () => {
			this._handleOpenPopup();
		})

		this._element.querySelector('.element__info-like').addEventListener('click', (e) => {
			e.target.classList.toggle('element__info-like_active');
		})

		this._element.querySelector('.element__delete').addEventListener('click', () => {
			this._cardElement.remove();
		})
		
	}

}
