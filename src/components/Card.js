import PopupWithImage from "./PopupWithImage";
import PopupWithForm from "./PopupWithForm.js";
import {
	authorization,
	groupID
} from "../utils/constants.js";

export default class Card {
	constructor(data, templateElement) {
		this._text = data.name;
		this._link = data.link;
		this._likes = data.likes || 0;
		this._id = data._id;
		this._templateElement = templateElement;
	}

	_getTemplate() {
		const cardElement = document
			.querySelector(this._templateElement)
			.content
			.cloneNode(true);
		return cardElement;
	}

	generateCard(profileId, item) {
		this._element = this._getTemplate();
		this._cardElement = this._element.querySelector('.element');
		const imageElement = this._element.querySelector('.element__image');
		const imageLikes = this._element.querySelector('.element__info-count');
		this._setEventListeners();
		imageElement.src = this._link;
		imageElement.alt = `Image of ${this._text}`;
		this._element.querySelector('.element__info-name').textContent = this._text;
		imageLikes.textContent = this._likes.length;
		if (item.owner._id != profileId) {
			this._element.querySelector('.element__delete').style.display = "none"
		}
		if (item.likes.some(like => like._id === profileId)) {
			this._element.querySelector('.element__info-like').classList.add('element__info-like_active');
		}
		return this._element;
	}

	_handleOpenPopup() {
		const popup = new PopupWithImage(this._text, this._link, '.picture');
		popup.setEventListeners();
		popup.open();
		
	}

	_setEventListeners() {
		const imageLikes = this._element.querySelector('.element__info-count');
		this._element.querySelector('.element__image').addEventListener('click', () => {
			this._handleOpenPopup();
		})
		this._element.querySelector('.element__info-like').addEventListener('click', (e) => {
			if (e.target.classList.contains('element__info-like_active')) {
				e.target.classList.remove('element__info-like_active')
				fetch(`https://around.nomoreparties.co/v1/${groupID}/cards/likes/${this._id}`, {
					method: "DELETE",
					headers: {
						authorization
					}
				})
				  .then(res => res.json())
				  .then(data => imageLikes.textContent = data.likes.length)
			} else {
				e.target.classList.add('element__info-like_active')
				fetch(`https://around.nomoreparties.co/v1/${groupID}/cards/likes/${this._id}`, {
					method: "PUT",
					headers: {
						authorization
					}
				})
				.then(res => res.json())
				.then(data => imageLikes.textContent = data.likes.length)
			}
		
		})

		this._element.querySelector('.element__delete').addEventListener('click', () => {
			const target = this._cardElement;
			const confirm = new PopupWithForm({
				handleFormSubmit: () => {
					target.remove();
					confirm.close();
					fetch(`https://around.nomoreparties.co/v1/${groupID}/cards/${this._id}`, {
						method: "DELETE",
						headers: {
							authorization
						}
					})
				}
			}, '.popup-delete', '.popup__form')
			confirm.setEventListeners();
			confirm.open();
		})
		
	}

}
