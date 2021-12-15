const popups = document.querySelector('.popup');
const cpopup = popups.querySelector('.popup__close');
const opopup = document.querySelector('.profile__edit');
const saveButton = document.querySelector('.form__save');
const bio = document.querySelector('.profile__info');
const form = document.querySelector('.form__input');
const name = document.getElementById('name');
const description = document.getElementById('description');

function pop() {
  popups.classList.add('popup_opened');
  name.value = document.querySelector('.profile__name').textContent;
  description.value = document.querySelector('.profile__description').textContent;
};

function close() {
  popups.classList.remove('popup_opened');
};

function saveName(evt) {
  evt.preventDefault();
  bio.innerHTML = `
  <h1 class="profile__name">${name.value}</h1>
  <p class="profile__description">${description.value}</p>`;
  name.value = document.querySelector('.profile__name').textContent;
  description.value = document.querySelector('.profile__description').textContent;
};

cpopup.addEventListener('click', close);
opopup.addEventListener('click', pop);
form.addEventListener('submit', saveName);
saveButton.addEventListener('click', close);
