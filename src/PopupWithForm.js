import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues(){
    this._inputList = this._popup.querySelectorAll('.popup__input-text');
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
    this.close();
  }
  close(){
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}

export default PopupWithForm;