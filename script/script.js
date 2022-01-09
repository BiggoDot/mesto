const popupProfile = document.querySelector('.popup_for_profile');
const popupCloseButton = popupProfile.querySelector('.popup__close_for_profile');
const popupOpenButton = document.querySelector('.profile__edit');
const formProfile = document.querySelector('.popup__form_for_profile');
const name = document.querySelector('.popup__input_for_name');
const description = document.querySelector('.popup__input_for_description');
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

/*NEW close on overlay*/
function closeOnOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    popupClose(document.querySelector('.popup_opened'));
  }
}; 

/*NEW close on esc*/
function closeKeyHandler(evt) {
  if (evt.key === 'Escape' || evt.keyCode == 27) {
    const classForClosing = document.querySelector('.popup_opened');
    popupClose(classForClosing);
  }
};

function popupOpen(target) {
  target.classList.add('popup_opened');
  document.addEventListener('keydown', closeKeyHandler);
  document.addEventListener('click', closeOnOverlay);
};

function popupClose(target) {
  target.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeKeyHandler);
  document.removeEventListener('click', closeOnOverlay);
};

function popupProfileOpen() {
  name.value = profileName.textContent; 
  description.value = profileDescription.textContent;
  popupOpen(popupProfile);
  document.querySelector('.popup__save_for_profile').classList.add('button_inactive');
  document.querySelector('.popup__save_for_profile').setAttribute('disabled', true);
  hideInputError(formProfile, name);
  hideInputError(formProfile, description);
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
  popupClose(popupPhoto);
  popupFormPhoto.reset();
};

function photoPopupOpen() {
  popupFormPhoto.reset();
  popupOpen(popupPhoto);
  document.querySelector('.popup__save_for_photo').classList.add('button_inactive');
  document.querySelector('.popup__save_for_photo').setAttribute('disabled', true);
  hideInputError(popupFormPhoto, inputPhotoName);
  hideInputError(popupFormPhoto, inputPhoto);
};

popupPohoCloseButton.addEventListener('click', () => popupClose(popupPhoto));
addPhotoButton.addEventListener('click', photoPopupOpen);
popupFormPhoto.addEventListener('submit', formAddPhotoHandler);
popupForImageClose.addEventListener('click', () => popupClose(popupForImage));
