import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js'
import { Popup } from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js';
import {config, popupProf,  
  popupOpenButton, formProfile, name, description, profileDescription,
  profileName, gridContainer, popupForImage, popupPhoto, 
  addPhotoButton, popupFormPhoto, initialCards
} from '../utils/constants.js';

const user = new UserInfo (profileName, profileDescription);
const imagePopup = new PopupWithImage(popupForImage);
const editFormValidator = new FormValidator(formProfile, config);
const addCardFormValidator = new FormValidator(popupFormPhoto, config);

// START VALIDATION
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// FUNCTIONS FOR ADDING CARD
function addCard(item) {
  photoGrid.addItem(item); 
};

function createCard(item) {
  const card = new Card(item.name, item.link, '.template__photo', 
  {handleCardClick: () => imagePopup.openImage(item.name, item.link)});
  const cardElement = card.createCard();
  return cardElement;
}

function makeCard (item) {
  const cardElement =  createCard(item);
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
const imageAdd = new PopupWithForm(popupPhoto, {callBack: (item)  => {
    makeCard({name: item.photoplace, link: item.photolink}); 
    imageAdd.close();
}});

addPhotoButton.addEventListener('click', ()=> {imageAdd.open();
  addCardFormValidator.removeError();
  addCardFormValidator.disableSubmitButton();})

imageAdd.setEventListeners();
imagePopup.setEventListeners();

// Спасибо за проверку! Хорошего вам дня!