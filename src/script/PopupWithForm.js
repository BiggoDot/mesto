import {Popup} from './Popup.js'
export class PopupWithForm extends Popup {
    constructor(popupSelector, {callBack}){
        super(popupSelector)
        this._form = this._popupSelector.querySelector('.popup__form');
        this._inputs = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
        this._callBack = callBack;
    }

         _getInputValues(){
             this._inputValues = {}
             this._inputs.forEach((item) =>{
            this._inputValues[item.name] = item.value
            });             
            return this._inputValues;           
         }

         setEventListeners(){
             super.setEventListeners();
             this._form.addEventListener('submit', (evt) => { evt.preventDefault();
                this._callBack(this._getInputValues())});
         }
         
         close(){
             super.close();
             this._form.reset();
         }
}