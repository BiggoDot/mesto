export class Popup {
    constructor(popupSelector){
        this._popupSelector = document.querySelector(popupSelector);
    }
    _closeOnOverlay = (evt) => {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
      }; 

     _closeKeyHandler = (evt) =>  {
        if (evt.key === 'Escape') {
          this.close();
        }
      };
    
      setEventListeners(){
        this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {this.close()});
      }
      
      open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeKeyHandler);
        window.addEventListener('mousedown', this._closeOnOverlay);
      };
      
      close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closeKeyHandler);
        window.removeEventListener('mousedown', this._closeOnOverlay);
      };  
}