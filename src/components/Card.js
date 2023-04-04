class Card {
  constructor(items, templateSelector, handleExpandCard, popupWithSubmit, userId, {handleLikeClick}) {
    this._name = items.name;
    this._link = items.link;
    this.likes = items.likes;
    this._cardId = items._id; //айди карточки
    this._ownerId = items.owner._id; //айди создателя карточки
    this._userId = userId; //мой айди
    this._templateSelector = templateSelector;
    this._handleExpandCard = handleExpandCard;
    this._popupDeleteCard = popupWithSubmit;
    this._handleLikeClick = handleLikeClick;
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
    this._cardImage = this._element.querySelector('.card__photo'); //картинка
    this._cardLike = this._element.querySelector('.card__like'); //кнопка лайк
    this._likeCounter = this._element.querySelector('.card__like-counter'); //количество лайков
    this._cardDelete = this._element.querySelector('.card__delete'); //иконка удаление 
    //вызовем проверку айди чтобы удалить корзинку на чужих карточках
    this._checkId();
    // выведем количество лайков
    this._likeCounter.textContent = this.likes.length;
    //проверим была ли карточка лайкнула если да закрасим лайк и наоборот
    if(this.isCardLike()){
      this.setLike();
    } else {
      this.deleteLike();
    }

    // this.setLikesCount(this._likes);
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
      this._popupDeleteCard.open(this._cardId, this);
    // теперь удаляем карточку только после того как пользователь нажал ДА
    // this._handleDeleteClick();
    });
    //слушатель клика по карточке с вызовом функции развернуть карточку
    this._cardImage.addEventListener('click', () => {
      this._handleExpandCard(this._name, this._link);
    });
  };
  
  //вернем айди карточки
  getCardId(){
    return this._cardId;
  }
  
  //счетчик количества лайков
  setLikesCount(data){ 
    //запишем сколько лайков у карточки
    this._likeCounter.textContent = data.length;
  }

  //проверяем лайкнута ли карточка 
  isCardLike(){
    //пройдем по массиву лайков и проверим наличие лайка юзера
    return this.likes.some((like) => like._id === this._userId)
  }

  //установим лайк
  setLike(){
    this._cardLike.classList.add('card__like_active'); 
  }

  //удалим лайк
  deleteLike(){
    this._cardLike.classList.remove('card__like_active');
  }
  //переключатель лайка
  // _handleLikeClick(){
  //   this._cardLike.classList.toggle('card__like_active');  
  // };

  //метод проверит айди и удалит кнопку корзины на чужих
  _checkId() {
    if (this._userId !== this._ownerId) {
      this._cardDelete.remove();
    }
  }

  //функция удалить карточку
  handleDeleteClick(){
    this._cardDelete.closest('.card').remove(); 
  };
};

export default Card;
