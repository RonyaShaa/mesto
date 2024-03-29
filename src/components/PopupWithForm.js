import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input-text');
    this._form = this._popup.querySelector('.popup__form');
    this._button = this._popup.querySelector('.popup__button');
  }
  
  
  _getInputValues(){
    this._formValues = {};
    this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close(){
    super.close();
    this._form.reset();
  }

  renderLoading(data){
    this._button.textContent = data;
  }
}

export default PopupWithForm;