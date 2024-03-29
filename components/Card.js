import { openModal, closeModal, handleEscape } from "../utils/utils.js";

const cardImageModal = document.querySelector("#preview-image");
const cardPreviewImage = document.querySelector(".modal__image");
const cardPreviewTitle = document.querySelector(".modal__preview-title");

class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handlePreviewPicture();
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handlePreviewPicture() {
    cardPreviewImage.src = this._link;
    cardPreviewImage.alt = this._name;
    cardPreviewTitle.textContent = this._name;
    openModal(cardImageModal);
  }

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getElement();

    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._cardImage = this._cardElement.querySelector(".card__image");

    this._cardTitle = this._cardElement.querySelector(".card__description");

    this._setEventListeners();

    this._cardImage.src = this._link;

    this._cardImage.alt = this._name;

    this._cardTitle.textContent = this._name;

    return this._cardElement;
  }
}

export default Card;
