import { Popup } from './Popup.js'
export class PopupWithForm extends Popup {
    constructor(popupSelector, { callBack }) {
        super(popupSelector)
        this._form = this._popup.querySelector('.popup__form');
        this._loadingButton = this._popup.querySelector('.popup__save')
        this._inputs = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._callBack = callBack;
    }

    _getInputValues() {
        this._inputValues = {}
        this._inputs.forEach((item) => {
            this._inputValues[item.name] = item.value
        });
        return this._inputValues;
    }

    switchCallBack({newCallBack}){
        this._callBack = newCallBack;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callBack(this._getInputValues())
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    renderLoading(isLoading, isSave){
        if(isLoading){
            this._loadingButton.textContent = 'Сохранение...';
        }
        else if(isSave){
            this._loadingButton.textContent = 'Сохранить';
        }
        else{
            this._loadingButton.textContent = 'Создать';
        }   
    }
}