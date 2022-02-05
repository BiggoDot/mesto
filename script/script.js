import {initialCards} from './array.js';
import {Card} from './card.js';
import {Validate} from './validate.js';

const config = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const popupProfile = document.querySelector('.popup_for_profile');
const popupCloseButton = popupProfile.querySelector('.popup__close_for_profile');
const popupOpenButton = document.querySelector('.profile__edit');
const formProfile = document.querySelector('.popup__form_for_profile');
const name = document.querySelector('.popup__input_for_name');
const description = document.querySelector('.popup__input_for_description');
const profileDescription = document.querySelector('.profile__description');
const profileName = document.querySelector('.profile__name');
const gridContainer = document.querySelector('.photo__grid');
export const popupForImage = document.querySelector('.popup_for_image');
export const popupImage = document.querySelector('.popup__image');
export const popupText = document.querySelector('.popup__title_for_image');
const popupForImageClose = document.querySelector('.popup__close_for_image');
const popupPhoto = document.querySelector('.popup_for_photo');
const addPhotoButton = document.querySelector('.profile__photo-button');
const popupPohoCloseButton = document.querySelector('.popup__close_for_photo');
const inputPhoto = document.getElementById('link');
const inputPhotoName = document.getElementById('place');
const popupFormPhoto = document.querySelector('.popup__form_for_photo');
const buttonSaveProfile = document.querySelector('.popup__save_for_profile');
const buttonSavePhoto = document.querySelector('.popup__save_for_photo');

/*close on overlay*/
function closeOnOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(document.querySelector('.popup_opened'));
  }
}; 

/*close on esc*/
function closeKeyHandler(evt) {
  if (evt.key === 'Escape' || evt.keyCode == 27) {
    const classForClosing = document.querySelector('.popup_opened');
    closePopup(classForClosing);
  }
};

export function openPopup(target) {
  target.classList.add('popup_opened');
  document.addEventListener('keydown', closeKeyHandler);
  document.addEventListener('mousedown', closeOnOverlay);
};

function closePopup(target) {
  target.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeKeyHandler);
  document.removeEventListener('mousedown', closeOnOverlay);
};

function openPopupProfile() {
  name.value = profileName.textContent; 
  description.value = profileDescription.textContent;
  openPopup(popupProfile);
  buttonSaveProfile.classList.add('button_inactive');
  buttonSaveProfile.setAttribute('disabled', true);
  const inputs = formProfile.querySelectorAll('.popup__input');
  const editFormValidator = new Validate(formProfile, config);
  editFormValidator.removeError(inputs);
};

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = name.value;
  profileDescription.textContent = description.value;
  closePopup(popupProfile);
};

popupCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupOpenButton.addEventListener('click', openPopupProfile);
formProfile.addEventListener('submit', submitProfileForm);

/*INSERTS CARD*/
function addCard(item) {
  gridContainer.prepend(item);
};

/*RUNNING THROUGH ARRAY*/
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '.template__photo');
  const cardElement = card.createCard();
  addCard(cardElement);
});

// START VALIDATION
const editFormValidator = new Validate(formProfile, config)
editFormValidator.enableValidation();

const addCardFormValidator = new Validate(popupFormPhoto, config)
addCardFormValidator.enableValidation();

/*ADD PHOTOS*/
function addPhotoHandler(evt) {
  evt.preventDefault();
  const card = new Card (inputPhotoName.value, inputPhoto.value, '.template__photo');
  const cardElement = card.createCard();
  addCard(cardElement);
  closePopup(popupPhoto);
  popupFormPhoto.reset();
};
// OPEN POPUP THAT ADDS PHOTOS
export function openPhotoPopup() {
  popupFormPhoto.reset();
  openPopup(popupPhoto);
  buttonSavePhoto.classList.add('button_inactive');
  buttonSavePhoto.setAttribute('disabled', true);
  const inputs = popupFormPhoto.querySelectorAll('.popup__input');
  const editFormValidator = new Validate(popupFormPhoto, config);
  editFormValidator.removeError(inputs);
};

popupPohoCloseButton.addEventListener('click', () => closePopup(popupPhoto));
addPhotoButton.addEventListener('click', openPhotoPopup);
popupFormPhoto.addEventListener('submit', addPhotoHandler);
popupForImageClose.addEventListener('click', () => closePopup(popupForImage));
