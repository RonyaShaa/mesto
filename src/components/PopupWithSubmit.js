import Popup from "./Popup.js";

class PopupWithSubmit extends Popup{
  constructor({popupSelector, handleWithSubmit}){
    super(popupSelector);
    this._handleWithSubmit = handleWithSubmit;
  }
  open(cardId, card){
    super.open();
    this._cardId = cardId;
    this._card = card;
  }
  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleWithSubmit(this._cardId, this._card);
    });
    this.close();
  }
}

export default PopupWithSubmit;