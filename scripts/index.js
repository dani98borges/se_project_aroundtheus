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

//Elements
const profileEditButton = document.querySelector("#profile-edit-button");
const editProfileModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = editProfileModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const modalTitleInput = document.querySelector("#modal-form-title");
const modalDescriptionInput = document.querySelector("#modal-form-description");
const addNewCardButton = document.querySelector(".profile__add-button");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");

const previewImageModal = document.querySelector("#image-modal");
const previewImageModalClose = previewImageModal.querySelector(
  "#preview-modal-close-button"
);
const previewTitle = previewImageModal.querySelector("#card-preview-title");
const previewImage = previewImageModal.querySelector("#card-preview-image");
const cardImage = document.querySelector(".card__image");
const cardTitle = document.querySelector(".card__title");

//Functions

function handleModalClose(modal) {
  modal.classList.remove("modal_opened");
}

function handleModalOpen(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.addEventListener("click", () => {
    const previewImageModal = document.querySelector("#image-modal");
    const previewTitle = previewImageModal.querySelector("#card-preview-title");
    const previewImage = previewImageModal.querySelector("#card-preview-image");

    previewImage.src = cardImage.src;
    previewImage.alt = cardTitle.textContent;
    previewTitle.textContent = cardTitle.textContent;
    handleModalOpen(previewImageModal);
  });

  cardTitle.textContent = cardData.name;
  cardImage.alt = cardTitle.textContent;
  cardImage.src = cardData.link;

  return cardElement;
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = modalTitleInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  handleModalClose(editProfileModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  handleModalClose(addCardModal);
}

profileEditButton.addEventListener("click", () => {
  modalTitleInput.value = profileTitle.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
  handleModalOpen(editProfileModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileModalCloseButton.addEventListener("click", () =>
  handleModalClose(editProfileModal)
);

addNewCardButton.addEventListener("click", () => handleModalOpen(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  handleModalClose(addCardModal)
);

previewImageModalClose.addEventListener("click", () => {
  handleModalClose(previewImageModal);
});

const likeButtons = document.querySelectorAll(".card__like-button");
likeButtons.forEach((likeButton) => {});
