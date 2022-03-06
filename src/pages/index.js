import './index.css';
import {initialCards} from '../script/array.js';
import {Card} from '../script/Card.js';
import {Validate} from '../script/Validate.js';
import {Section} from '../script//Section.js'
import { Popup } from '../script//Popup.js';
import {PopupWithImage} from '../script//PopupWithImage.js'
import {PopupWithForm} from '../script//PopupWithForm.js'
import {UserInfo} from '../script//UserInfo.js';

const config = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};
const popupProf = '.popup_for_profile';
const popupProfile = document.querySelector('.popup_for_profile');
export const popupCloseButton = popupProfile.querySelector('.popup__close_for_profile');
export const popupOpenButton = document.querySelector('.profile__edit');
const formProfile = document.querySelector('.popup__form_for_profile');
const name = document.querySelector('.popup__input_for_name');
const description = document.querySelector('.popup__input_for_description');
const profileDescription = '.profile__description';
const profileName = '.profile__name';
const gridContainer = '.photo__grid';
const popupForImage = '.popup_for_image';
const popupPhoto = '.popup_for_photo';
const addPhotoButton = document.querySelector('.profile__photo-button');
const inputPhoto = document.getElementById('link');
const inputPhotoName = document.getElementById('place');
const popupFormPhoto = document.querySelector('.popup__form_for_photo');
const user = new UserInfo (profileName, profileDescription);
const imagePopup = new PopupWithImage(popupForImage);
const editFormValidator = new Validate(formProfile, config);
const addCardFormValidator = new Validate(popupFormPhoto, config);

// START VALIDATION
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// FUNCTIONS FOR ADDING CARD
function addCard(item) {
  photoGrid.addItem(item); 
};

function makeCard (item) {
  const card = new Card(item.name, item.link, '.template__photo', 
    {handleCardClick: () => imagePopup.openImage(item.name, item.link)});
    const cardElement = card.createCard();
    addCard(cardElement);
};

// CREATE SECTION
const photoGrid = new Section({items:initialCards, 
  renderer:(item) =>{ makeCard (item)
  }}, gridContainer);

  photoGrid.renderItems();

// EVERYTHING FOR PROFILE POPUP 
const profile = new PopupWithForm(popupProf, {callBack: (info)  => {  
  user.setUserInfo(info.name, info.description); 
  profile.close();
}});

popupOpenButton.addEventListener('click', () => {profile.open();
  const userData = user.getUserInfo()
  name.value = userData.name;
  description.value = userData.description; 
  editFormValidator.removeError();
  editFormValidator.disableSubmitButton();
})

profile.setEventListeners();

// EVERYTHIG FOR IMAGE POPUP
const imageAdd = new PopupWithForm(popupPhoto, {callBack: ()  => {
  makeCard({name:inputPhotoName.value, link:inputPhoto.value});
    imageAdd.close();
}});

addPhotoButton.addEventListener('click', ()=> {imageAdd.open();
  addCardFormValidator.removeError();
  addCardFormValidator.disableSubmitButton();})

imageAdd.setEventListeners();

// Спасибо за проверку! Хорошего вам дня!