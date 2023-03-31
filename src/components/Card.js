import PopupWithForm from "./PopupWithForm";
import PopupWithSubmit from "./PopupWithSubmit";

class Card {
  constructor(items, templateSelector, handleExpandCard, popupWithSubmit) {
    this._name = items.name;
    this._link = items.link;
    this._likes = items.likes;
    this._templateSelector = templateSelector;
    this._handleExpandCard = handleExpandCard;
    this._popupDeleteCard = popupWithSubmit;
  };
  //создаем разметку
  _getTemplate(){
    
    const card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return card;
  };
  // Функция создает и возвращает карточку
  generateCard(){
  // Запишем разметку в приватное поле _element. 
  // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__photo');
    this._cardLike = this._element.querySelector('.card__like');
    this._likeConter = this._element.querySelector('.card__like-counter');
    //запишем сколько лайков у карточки
    this._likeConter.textContent = this._likes.length;
    this._cardDelete = this._element.querySelector('.card__delete');
    this._setEventListeners();
  // Добавим данные
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__name').textContent = this._name;
   
    return this._element;
  };
  //установка слушателей
  _setEventListeners() {
    //слушатель кнопки лайк
    this._cardLike.addEventListener('click', () => {
      this._handleLikeClick();
    });
    //слушатель кнопки удалить
    this._cardDelete.addEventListener('click', () => {
      this._popupDeleteCard.open();
      this._handleDeleteClick();
    });
    //слушатель клика по карточке с вызовом функции развернуть карточку
    this._cardImage.addEventListener('click', () => {
      this._handleExpandCard(this._name, this._link);
    });
  };
  //переключатель лайка
  _handleLikeClick(){
    this._cardLike.classList.toggle('card__like_active');
  };
  //функция удалить карточку
  _handleDeleteClick(){
    this._cardDelete.closest('.card').remove();
  };
};

export default Card;
