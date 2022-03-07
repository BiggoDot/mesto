  export class Card {
    constructor(name, link, templateSelector, {handleCardClick}) {
      this._name = name;
      this._link = link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
      const photoTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photo__item')
      .cloneNode(true);
    
      return photoTemplate;
    }

    createCard() {
      this._element = this._getTemplate(); 
      this._img = this._element.querySelector('.photo__mesto');
      this._description = this._element.querySelector('.photo__description');
      this._likeButton = this._element.querySelector('.photo__like');
      this._deleteButton =  this._element.querySelector('.photo__delete');
      this._img.src = this._link;
      this._img.alt = this._name;
      this._description.textContent = this._name;
      this._setEventListeners();
    
     return this._element;
    }
    
    _deletePhotoHandler() {
      this._element.remove();
      };

      _toggleLikes() {
        this._likeButton.classList.toggle('photo__like_active');     
     }

     _setEventListeners() {        
      this._deleteButton.addEventListener('click', () => {this._deletePhotoHandler()});
      this._likeButton.addEventListener('click', () => {this._toggleLikes()}); 
      this._img.addEventListener('click', this._handleCardClick); 
    }
    
    }

    