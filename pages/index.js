import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal, handleEscape } from "../utils/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
//const profileCloseBtn = document.querySelector("#profile-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileTitleInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
//const cardTemplate = document
//.querySelector("#card-template")
//.content.querySelector(".card");
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
//const cardCloseBtn = document.querySelector("#card-modal-close");
const cardAddForm = addCardModal.querySelector(".modal__form");
const cardAddLink = document.querySelector("#card-url-input");
const cardAddTitle = document.querySelector("#card-title-input");
const cardAddTitleInput = document.querySelector("#card-title-input");
const cardAddLinkInput = document.querySelector("#card-url-input");
const previewImageModal = document.querySelector("#preview-image");
//const modalImage = document.querySelector(".modal__image");
//const modalText = document.querySelector(".modal__preview-title");
//const previewCloseBtn = document.querySelector("#preview-image-close");

const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error_visible",
};

const cardData = {
  name: cardAddTitle.value,
  link: cardAddLink.value,
};

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, "#card-template");
  cardListEl.append(cardElement);
});

function createCard(cardData, cardSelector) {
  const cardElement = new Card(cardData, cardSelector);
  return cardElement.getView();
}

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, cardAddForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

function renderCard(cardData, cardsListEl) {
  const card = createCard(cardData, "#card-template");
  cardsListEl.prepend(card);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);

  editFormValidator.toggleButtonState();
}

function handleCardAddFormSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: cardAddTitleInput.value,
    link: cardAddLinkInput.value,
  };

  renderCard(cardData, cardListEl);
  closeModal(addCardModal);

  cardAddForm.reset();
  addFormValidator.toggleButtonState();
}

profileEditBtn.addEventListener("click", () => {
  openModal(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileSubtitle.textContent;
});

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleCardAddFormSubmit);

[profileEditModal, addCardModal, previewImageModal].forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    if (
      event.target.classList.contains("modal") ||
      event.target.classList.contains("modal__close")
    ) {
      closeModal(modal);
    }
  });
});
