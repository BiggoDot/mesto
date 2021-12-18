const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const popupOpenButton = document.querySelector('.profile__edit');
const saveButton = document.querySelector('.popup__save');
const bio = document.querySelector('.profile__info');
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
