const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const popupOpenButton = document.querySelector('.profile__edit');
const form = document.querySelector('.popup__form');
const name = document.getElementById('name');
const description = document.getElementById('description');
const profileDescription = document.querySelector('.profile__description');
const profileName = document.querySelector('.profile__name');

function popupOpen() {
  name.value = profileName.textContent;
  description.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
};

function popupClose() {
  popup.classList.remove('popup_opened');
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = name.value;
  profileDescription.textContent = description.value;
  popupClose();
};

popupCloseButton.addEventListener('click', popupClose);
popupOpenButton.addEventListener('click', popupOpen);
form.addEventListener('submit', formSubmitHandler);

//WORK 5

const initialCards = [
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

const gridContainer = document.querySelector('.photo__grid');
const photoTemplate = document.querySelector('.template__photo').content;
const photoList = photoTemplate.querySelector('.photo__item');

/*DELETE PHOTO*/
function deletePhotoHandler(evt) {
  evt.target.closest('.photo__item').remove();
};
/*LIKE PHOTO*/
function toLike(evt) {
  evt.target.classList.toggle('photo__like_active');
}
const popupForImage = document.querySelector('.popup_for_image');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__title_for_image');
const popupForImageClose = document.querySelector('.popup__close_for_image');


/*WORK WITH ARRAY*/
function recieveCard (item) {
  const photoGrid = photoTemplate.cloneNode(true);
  const mesto = photoGrid.querySelector('.photo__mesto');
  const photoDescription = photoGrid.querySelector('.photo__description');
  const likeButton = photoGrid.querySelector('.photo__like');
  const deleteButton = photoGrid.querySelector('.photo__delete');
  
  mesto.src = item.link;
  mesto.alt = item.name;
  photoDescription.textContent = item.name;

  deleteButton.addEventListener('click', deletePhotoHandler);
  likeButton.addEventListener('click', toLike);

  mesto.addEventListener('click', function () {
    popupForImage.classList.add('popup_opened');
    popupImage.src = mesto.src;
    popupImage.alt = mesto.alt;
    popupText.textContent = photoDescription.textContent;
  });

  popupForImageClose.addEventListener('click', function () {
    popupForImage.classList.remove('popup_opened');
  });


  gridContainer.prepend(photoGrid);

};
initialCards.forEach(recieveCard);
/*ADD PHOTOS*/
const inputPhoto = document.getElementById('link');
const inputPhotoName = document.getElementById('place');
const popupFormPhoto = document.querySelector('.popup__form_for_photo');

function formAddPhotoHandler(evt) {
  evt.preventDefault();
  recieveCard({
    name: inputPhotoName.value,
    link: inputPhoto.value,
  });
  photoPopupClose();
  popupFormPhoto.reset();
};
popupFormPhoto.addEventListener('submit', formAddPhotoHandler);
/*WORK WITH POPUP(OPEN AND CLOSE)*/
const popupPhoto = document.querySelector('.popup_for_photo');
const addPhotoButton = document.querySelector('.profile__photo-button');
const popupPohotCloseButton = document.querySelector('.popup__close_for_photo');

function photoPopupOpen() {
  popupPhoto.classList.add('popup_opened');
};

function photoPopupClose() {
  popupPhoto.classList.remove('popup_opened');
  popupFormPhoto.reset();
};

popupPohotCloseButton.addEventListener('click', photoPopupClose);
addPhotoButton.addEventListener('click', photoPopupOpen);
