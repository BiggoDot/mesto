let popups = document.querySelector('.popup');
let cpopup = popups.querySelector('.popup__close');
let opopup = document.querySelector('.profile__edit');
let saveButton = document.querySelector('.form__save');
let bio = document.querySelector('.profile__info');
let form = document.querySelector('.form__input');

function pop() {
    popups.classList.add('popup_opened');
};
opopup.addEventListener('click', pop);

function close() {
    popups.classList.remove('popup_opened');
};
cpopup.addEventListener('click', close);
cpopup.addEventListener('click', unsave);

function unsave() {
    if (close = true) {
        let name = document.querySelector('.form__name');
        let description = document.querySelector('.form__extra');
        name.value = document.querySelector('.profile__name').textContent;
        description.value = document.querySelector('.profile__description').textContent;
    };
};

function saveName(evt) {
    evt.preventDefault();
    let name = document.querySelector('.form__name');
    let description = document.querySelector('.form__extra');

    bio.innerHTML = `
 <h1 class="profile__name">${name.value}</h1>
 <p class="profile__description">${description.value}</p>
   `;

    name.value = document.querySelector('.profile__name').textContent;
    description.value = document.querySelector('.profile__description').textContent;
};

form.addEventListener('submit', saveName);
saveButton.addEventListener('click', close);











