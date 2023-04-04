import Popup from "./Popup.js";

class PopupWithSubmit extends Popup{
  constructor({popupSelector, handleWithSubmit}){
    super(popupSelector);
    this._handleWithSubmit = handleWithSubmit;
    this._button = this._popup.querySelector('.popup__button-yes');
  }
  open(cardId, card){
    super.open();
    this._cardId = cardId;
    this._card = card;
  }
  setEventListeners(){
    super.setEventListeners();
    this._button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleWithSubmit(this._cardId, this._card);
    });
  }
  renderLoading(data){
    this._button.textContent = data;
  }
}

export default PopupWithSubmit;