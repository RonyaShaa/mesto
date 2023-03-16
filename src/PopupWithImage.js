import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupPhoto = document.querySelector('.popup__photo');
    this._popupPhotoName = document.querySelector('.popup__photo-name');

  }
  open(name, link){
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    this._popupPhotoName.textContent = name;
    super.open();
  }
}


export default PopupWithImage;