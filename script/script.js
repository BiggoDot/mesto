const popupProfile = document.querySelector('.popup_for_profile');
const popupCloseButton = popupProfile.querySelector('.popup__close_for_profile');
const popupOpenButton = document.querySelector('.profile__edit');
const formProfile = document.querySelector('.popup__form_for_profile');
const name = document.getElementById('name');
const description = document.getElementById('description');
const profileDescription = document.querySelector('.profile__description');
const profileName = document.querySelector('.profile__name');
const gridContainer = document.querySelector('.photo__grid');
const photoTemplate = document.querySelector('.template__photo').content;
const photoList = photoTemplate.querySelector('.photo__item');
const popupForImage = document.querySelector('.popup_for_image');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__title_for_image');
const popupForImageClose = document.querySelector('.popup__close_for_image');
const popupPhoto = document.querySelector('.popup_for_photo');
const addPhotoButton = document.querySelector('.profile__photo-button');
const popupPohoCloseButton = document.querySelector('.popup__close_for_photo');
const inputPhoto = document.getElementById('link');
const inputPhotoName = document.getElementById('place');
const popupFormPhoto = document.querySelector('.popup__form_for_photo');

function popupOpen(target) {
  target.classList.add('popup_opened');
};

function popupClose(target) {
  target.classList.remove('popup_opened');
};
function popupProfileOpen() {
  name.value = profileName.textContent; 
  description.value = profileDescription.textContent;
  popupOpen(popupProfile);
};
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = name.value;
  profileDescription.textContent = description.value;
  popupClose(popupProfile);
};

popupCloseButton.addEventListener('click', () => popupClose(popupProfile));
popupOpenButton.addEventListener('click', popupProfileOpen);
formProfile.addEventListener('submit', formSubmitHandler);

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
/*CREATING LIST, CARD, ADD EVENTS*/
function createCard(name, link) {
  const photoGrid = photoTemplate.cloneNode(true);
  const mesto = photoGrid.querySelector('.photo__mesto');
  const photoDescription = photoGrid.querySelector('.photo__description');
  const likeButton = photoGrid.querySelector('.photo__like');
  const deleteButton = photoGrid.querySelector('.photo__delete');

  mesto.src = link;
  mesto.alt = name;
  photoDescription.textContent = name;

  deleteButton.addEventListener('click', deletePhotoHandler);
  likeButton.addEventListener('click', toLike);
  mesto.addEventListener('click', popupImageOpen);
  return photoGrid;
};

/*INSERTS CARD*/
function addCard(item) {
  gridContainer.prepend(item);
};

/*RUNNING THROUGH ARRAY*/
initialCards.forEach(item => {
  const card = createCard(item.name, item.link);
  addCard(card);
});

/*OPEN IMAGE*/
function popupImageOpen(evt) {
  popupImage.src = evt.target.src;
  popupText.textContent = evt.target.alt;
  popupImage.alt = evt.target.alt;
  popupOpen(popupForImage);
};

/*DELETE PHOTO*/
function deletePhotoHandler(evt) {
  evt.target.closest('.photo__item').remove();
};

/*LIKE PHOTO*/
function toLike(evt) {
  evt.target.classList.toggle('photo__like_active');
}

/*ADD PHOTOS*/
function formAddPhotoHandler(evt) {
  evt.preventDefault();
  const card = createCard(inputPhotoName.value, inputPhoto.value);
  addCard(card);
  photoPopupClose();
  popupFormPhoto.reset();
};

/*CLOSE POPUP*/
function photoPopupClose() {
  popupFormPhoto.reset();
  popupClose(popupPhoto);
};

popupPohoCloseButton.addEventListener('click', photoPopupClose);
addPhotoButton.addEventListener('click', () => popupOpen(popupPhoto));
popupFormPhoto.addEventListener('submit', formAddPhotoHandler);
popupForImageClose.addEventListener('click', () => popupClose(popupForImage));
/*С наступающим новым годом, Владимир.
  Желаю вам здоровья и что бы все ваши мечты сбывались!
  Спасибо вам большое за то что, помогаете нам стать лучше!*/
