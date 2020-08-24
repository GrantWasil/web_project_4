class Card {
	constructor(data, templateElement, togglePopup) {
		this._text = data.name;
		this._link = data.link;
		this._templateElement = templateElement;
		this._togglePopup = togglePopup;
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
		this._setEventListeners();
		this._element.querySelector('.element__image').src = this._link;
		this._element.querySelector('.element__image').alt = `Image of ${this._text}`;
		this._element.querySelector('.element__info-name').textContent = this._text;

		return this._element;
	}

	_handleOpenPopup() {
        document.querySelector('.picture__container-title').textContent = this._text;
        document.querySelector('.picture__container-image').src = this._link;
        document.querySelector('.picture__container-image').alt = `Photo of ${this._text}`
		this._togglePopup(document.querySelector('.picture'));
	}

	_setEventListeners() {
		this._element.querySelector('.element__image').addEventListener('click', () => {
			this._handleOpenPopup();
		})

		this._element.querySelector('.element__info-like').addEventListener('click', (e) => {
			e.target.classList.toggle('element__info-like_active');
		})

		this._element.querySelector('.element__delete').addEventListener('click', (e) => {
			const targetElement = e.target.closest('.element');
			targetElement.remove();
		})
	}

}

export default Card;