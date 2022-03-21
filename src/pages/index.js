import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js'
import { Popup } from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js';
import {api} from '../components/Api.js'
import {config, popupProfile,  
  profileOpenButton, formProfile, inputForName, inputForDescription, profileDescription,
  profileName, gridContainer, popupForImage, popupAddPhoto, 
  addPhotoButton, popupFormAddPhoto, avatarButton, avatarPopup
} from '../utils/constants.js';


const user = new UserInfo (profileName, profileDescription, '.profile__avatar');
const imagePopup = new PopupWithImage(popupForImage);
const editFormValidator = new FormValidator(formProfile, config);
const addCardFormValidator = new FormValidator(popupFormAddPhoto, config);
const avatarValidator = new FormValidator(avatarPopup, config);
let userId;

// PROMISES
Promise.all([api.getInitialCards(), api.getProfile()])
  .then(([cards, userData]) => {
   userId = userData._id;
   user.setUserInfo(userData.name, userData.about);
   user.setUserAvatar(userData.avatar);
   cards.reverse()
   photoGrid.renderItems(cards);
  })
  .catch((err) =>{console.log(`Ошибка: ${err}`)})

// START VALIDATION
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarValidator.enableValidation();

// FUNCTIONS FOR ADDING CARD
function addCard(item) {
  photoGrid.addItem(item); 
};

function createCard(item) {
  const card = new Card(item.name, item.link, item.likes, item._id, 
    userId, item.ownerId, '.template__photo', 
  {handleCardClick: () => imagePopup.openImage(item.name, item.link),
   deleteIcon: (id) => {
    deleteConfirm.open()
    deleteConfirm.switchCallBack({newCallBack: () => {
      api.deleteCard(id)
      .then(res =>{
        card.deletePhotoHandler();
        deleteConfirm.close();
      })
      .catch((err) =>{console.log(`Ошибка: ${err}`)})
    }
  })
  },
  handleLike: (id) => {
    if(card.isLiked()){
      api.deleteLike(id)
    .then(res => {
      card.setLikes(res.likes)
    })
    .catch((err) =>{console.log(`Ошибка: ${err}`)})    
    }
    else {
      api.putLike(id)
    .then(res => {
      card.setLikes(res.likes)
    })
    .catch((err) =>{console.log(`Ошибка: ${err}`)})
    }    
  }
  });
  const cardElement = card.createCard();
  return cardElement;
}

function makeCard (item) {
  const cardElement =  createCard(item);
  addCard(cardElement);
};

// CREATE SECTION
const photoGrid = new Section({ 
  renderer:(item) =>{  makeCard ({name: item.name, link: item.link, likes: item.likes, _id: item._id,
    userId: userId, ownerId: item.owner._id})
  }}, gridContainer);
  
  
// EVERYTHING FOR PROFILE POPUP 
const profile = new PopupWithForm(popupProfile, {callBack: (info)  => {  
  profile.renderLoading(true)
  api.editProfile(info.name, info.description)  
  .then(res => {
    user.setUserInfo(res.name, res.about);
    profile.close();
  }) 
  .catch((err) =>{console.log(`Ошибка: ${err}`)})
  .finally(() =>{profile.renderLoading(false)})
}});

profileOpenButton.addEventListener('click', () => {profile.open();
  const userData = user.getUserInfo()
  inputForName.value = userData.name;
  inputForDescription.value = userData.description; 
  editFormValidator.removeError();
  editFormValidator.disableSubmitButton();
})

profile.setEventListeners();

// EVERYTHIG FOR IMAGE POPUP
const photoAdd = new PopupWithForm(popupAddPhoto, {callBack: (item)  => {
    photoAdd.renderLoading(true)
    api.newCard(item.photoplace, item.photolink)
    .then(res => {
      makeCard({name: res.name, link: res.link, likes: res.likes, _id: res._id, 
        userId: res._id, ownerId: res.owner._id});
      photoAdd.close();
    }) 
    .catch((err) =>{console.log(`Ошибка: ${err}`)})
    .finally(() =>{photoAdd.renderLoading(false)})
}});

addPhotoButton.addEventListener('click', () => {photoAdd.open();
  addCardFormValidator.removeError();
  addCardFormValidator.disableSubmitButton();})

photoAdd.setEventListeners();

// EVERYTHING FOR DELETING IMAGE
const deleteConfirm = new PopupWithForm('.popup_for_delete', {});

deleteConfirm.setEventListeners();

// EVERYTHING FOR CHANGING AVATAR
const avatarChange = new PopupWithForm('.popup_for_avatar', {callBack: (info)  => {  
  avatarChange.renderLoading(true);
  api.setAvatar(info.avatar)  
  .then(res => {
     user.setUserAvatar(res.avatar);
     avatarChange.close();
  }) 
  .catch((err) =>{console.log(`Ошибка: ${err}`)})
  .finally(() =>{avatarChange.renderLoading(false)})
}});

avatarButton.addEventListener('click', () => {avatarChange.open();
  avatarValidator.removeError();
  avatarValidator.disableSubmitButton();})
  
avatarChange.setEventListeners();
// EVENTLISTENER FOR POPUP WITH IMAGE
imagePopup.setEventListeners();


// Спасибо за проверку! Хорошего вам дня!