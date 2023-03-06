class Card {
  constructor(data, templateSelector, handleExpandCard) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleExpandCard = handleExpandCard;
  }

  _getTemplate(){
    const card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return card;
  }

  render 

  // Функция создания карточки
  generateCard(){
  // Запишем разметку в приватное поле _element. 
  // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();

  // Добавим данные
  
    this._element.querySelector('.card__photo').src = this._link;
    this._element.querySelector('.card__photo').alt = this._name;
    this._element.querySelector('.card__name').textContent = this._name;
   
    return this._element;
  }

  _setEventListeners() {
    //слушатель кнопки лайк
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeClick();
    });

    //слушатель кнопки удалить
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDeleteClick();
    });
    //слушатель клика по карточке с вызовом функции развернуть карточку
    this._element.querySelector('.card__photo').addEventListener('click', () => {
      this._handleExpandCard(this._name, this._link);
    });
  }

  _handleLikeClick(){
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleDeleteClick(){
    this._element.querySelector('.card__delete').closest('.card').remove();
  }
  
}



export default Card;
