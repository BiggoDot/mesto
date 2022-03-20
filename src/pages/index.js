import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js'
import { Popup } from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js';
import {api} from '../components/Api.js'
import {config, popupProf,  
  popupOpenButton, formProfile, name, description, profileDescription,
  profileName, gridContainer, popupForImage, popupPhoto, 
  addPhotoButton, popupFormPhoto, avatarButton
} from '../utils/constants.js';

const ava = document.querySelector('.popup__form_for_avatar')
const user = new UserInfo (profileName, profileDescription, '.profile__avatar');
const imagePopup = new PopupWithImage(popupForImage);
const editFormValidator = new FormValidator(formProfile, config);
const addCardFormValidator = new FormValidator(popupFormPhoto, config);
const avatarValidator = new FormValidator(ava, config);
let userId;

// PROMISES
Promise.all([api.getInitialCards(), api.getProfile()])
  .then(([cards, userData]) => {
   userId = userData._id;
   user.setUserInfo(userData.name, userData.about);
   user.setUserAvatar(userData.avatar);
   cards.forEach(card =>{
    const cardItem = createCard({name: card.name, link: card.link, likes: card.likes, _id: card._id,
    userId: userId, ownerId: card.owner._id});
    photoGrid.addItemAppend(cardItem);})
  })

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
    }
  })
  },
  handleLike: (id) => {
    if(card.isLiked()){
      api.deleteLike(id)
    .then(res => {
      card.setLikes(res.likes)
    })    
    }
    else {
      api.putLike(id)
    .then(res => {
      card.setLikes(res.likes)
    })
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
const photoGrid = new Section({items: [], 
  renderer:(item) =>{ makeCard (item)
  }}, gridContainer);

// EVERYTHING FOR PROFILE POPUP 
const profile = new PopupWithForm(popupProf, {callBack: (info)  => {  
  profile.renderLoading(true, true)
  api.editProfile(info.name, info.description)  
  .then(res => {
    user.setUserInfo(res.name, res.about);
    profile.close();
  }) 
  .catch((err) =>{console.log(`Ошибка: ${err}`)})
  .finally(() =>{profile.renderLoading(false, true)})
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
    imageAdd.renderLoading(true, false)
    api.newCard(item.photoplace, item.photolink)
    .then(res => {
      makeCard({name: res.name, link: res.link, likes: res.likes, _id: res._id, 
        userId: res._id, ownerId: res.owner._id});
      imageAdd.close();
    }) 
    .catch((err) =>{console.log(`Ошибка: ${err}`)})
    .finally(() =>{imageAdd.renderLoading(false, false)})
}});

addPhotoButton.addEventListener('click', () => {imageAdd.open();
  addCardFormValidator.removeError();
  addCardFormValidator.disableSubmitButton();})

imageAdd.setEventListeners();

// EVERYTHING FOR DELETING IMAGE
const deleteConfirm = new PopupWithForm('.popup_for_delete', {});

deleteConfirm.setEventListeners();

// EVERYTHING FOR CHANGING AVATAR
const avatarChange = new PopupWithForm('.popup_for_avatar', {callBack: (info)  => {  
  avatarChange.renderLoading(true, true);
  api.setAvatar(info.avatar)  
  .then(res => {
     user.setUserAvatar(res.avatar);
     avatarChange.close();
  }) 
  .catch((err) =>{console.log(`Ошибка: ${err}`)})
  .finally(() =>{avatarChange.renderLoading(false, true)})
}});

avatarButton.addEventListener('click', () => {avatarChange.open();
  avatarValidator.removeError();
  avatarValidator.disableSubmitButton();})
  
avatarChange.setEventListeners();
// EVENTLISTENER FOR POPUP WITH IMAGE
imagePopup.setEventListeners();


// Спасибо за проверку! Хорошего вам дня!