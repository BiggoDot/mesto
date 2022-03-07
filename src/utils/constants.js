export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];  
export const config = {
    formElement: '.popup__form',
    inputElement: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
  };
  export const popupProf = '.popup_for_profile';
  export const popupOpenButton = document.querySelector('.profile__edit');
  export const formProfile = document.querySelector('.popup__form_for_profile');
  export const name = document.querySelector('.popup__input_for_name');
  export const description = document.querySelector('.popup__input_for_description');
  export const profileDescription = '.profile__description';
  export const profileName = '.profile__name';
  export const gridContainer = '.photo__grid';
  export const popupForImage = '.popup_for_image';
  export const popupPhoto = '.popup_for_photo';
  export const addPhotoButton = document.querySelector('.profile__photo-button');
  export const popupFormPhoto = document.querySelector('.popup__form_for_photo');