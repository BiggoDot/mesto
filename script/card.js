  import {popupForImage, openPopup, popupImage,  popupText} from './script.js'
  export class Card {
    constructor(name, link, templateSelector) {
      this._name = name;
      this._link = link;
      this._templateSelector = templateSelector;
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
      this._setEventListeners();
      this._element.querySelector('.photo__mesto').src = this._link;
      this._element.querySelector('.photo__mesto').alt = this._name;
      this._element.querySelector('.photo__description').textContent = this._name;
      
     return this._element;
    }
    
    _deletePhotoHandler() {
        this._element.querySelector('.photo__delete').closest('.photo__item').remove();
      };

     _toLike() {
       this._element.querySelector('.photo__like').classList.toggle('photo__like_active');
     }

     _openPopupImage() {
      popupImage.src = this._link;
      popupText.textContent = this._name;
      popupImage.alt = this._name;
      openPopup(popupForImage);
    };

     _setEventListeners() {
        
      this._element.querySelector('.photo__delete').addEventListener('click', () => {
           this._deletePhotoHandler()});
      this._element.querySelector('.photo__like').addEventListener('click', () => {this._toLike()});
      this._element.querySelector('.photo__mesto').addEventListener('click', () => {this._openPopupImage()});   
    }
    
    }

    