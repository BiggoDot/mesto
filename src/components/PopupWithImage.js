import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image')
        this._text = this._popup.querySelector('.popup__title_for_image');       
    }

    openImage(name, link) {
        super.open();
        this._image.src = link;
        this._text.textContent = name;
        this._image.alt = name;    
      }; 
}