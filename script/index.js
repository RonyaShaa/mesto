
//-----------------------------4-sprint---------------------------------

//нашли кнопку Редактировать профиль
const btnEditProfile = document.querySelector('.profile__button');
//нашли попап редактирования профиля
//let popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup__edit-profile')
//нашли кнопку закрыть попап ред.профиля
const btnPopupClose = document.querySelector('.popup__close');
//инпуты имя профиля и  интересы
const nameInput = document.querySelector('.popup__input-text_type_name');
const  interestsInput =  document.querySelector('.popup__input-text_type_interests');
//имя профиля и интересы в секции(где  будет меняться)
const profileName = document.querySelector('.profile__name');
const profileInterests = document.querySelector('.profile__interests');
//нашли форму попапа
const formPopup = document.querySelector('.popup__form');

//-----------Универсальные функции Открыть/Закрыть попап--------------------------------


//функция открытия попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//функция закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//-----------Первый попап Редактировать профиль--------------------------------

//слушатель клика по кнопке Редактировать профиль с вызовом функции открыть попап 
btnEditProfile.addEventListener('click', function(){
  nameInput.value = profileName.textContent;
  interestsInput.value = profileInterests.textContent;
  openPopup(popupEditProfile);
});

//слушатель клика по кнопке Закрыть попап с вызовом функции закрыть попап 
btnPopupClose.addEventListener('click', function (){
  closePopup(popupEditProfile);
});

//слушатель сабмит формы попап
formPopup.addEventListener('submit', handleFormSubmit);

//функция обработки сабмит с вызовом функции закрытия попап 
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInterests.textContent = interestsInput.value;
  closePopup(popupEditProfile);
}

//----------------------5-sprint-------------------------------------------


//-----------Второй попап Добавить карточку--------------------------------

//нашли попап Добавить карточку
const popupAddCard = document.querySelector('.popup__add-card');
//нашли кнопку открыть попап 'Добавить карточку'
const btnAddCard = document.querySelector('.profile__add-photo');
//нашли кнопку закрытия попап 
const btnPopupCloseAddCard = document.querySelector('.popup__close_add_card');




//слушатель клика по кнопке 'Добавить карточку' с вызовом функции открыть попап
btnAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
});

//слушатель клика по кнопке Закрыть попап с вызовом функции закрыть попап
btnPopupCloseAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
});

//-----------Добавление карточек из массива-------------------------------

//объявляем массив карточек 

const initialCards = [
  {
    name: 'Памятник Затопленным кораблям',
    link: 'https://images.unsplash.com/photo-1595451800185-fb4cb2465b3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Воронцовский дворец',
    link: 'https://images.unsplash.com/photo-1655094378266-7eddc4f29c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Ялтинский маяк',
    link: 'https://images.unsplash.com/photo-1564085892527-f072eb172a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Ласточкино гнездо',
    link: 'https://images.unsplash.com/photo-1598867957922-2cd433a5dacc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80'
  },
  {
    name: 'Тарханкутский маяк',
    link: 'https://images.unsplash.com/photo-1633585309605-98205cda91e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
  },
  {
    name: 'Белая скала',
    link: 'https://images.unsplash.com/photo-1623527859001-8010a15cf790?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  }
];

/*
//пройдем по массиву карточек 
initialCards.forEach(({name, link}) => {
  //получаем содержимое тега темплейт
  const templateCards = document.querySelector('#card').content;
  //клонируем содержимое тега темплейт
  const articleCards = templateCards.querySelector('.card').cloneNode(true);
  //наполняем содержимым
  articleCards.querySelector('.card__photo').src = link;
  articleCards.querySelector('.card__name').textContent = name;
  //получаем тег в который вложим содержимое темплейт
  const cardContainer = document.querySelector('.cards');
  //отображаем на странице
  cardContainer.append(articleCards);
});
*/

//найдем темплейт карточки
const templateCards = document.querySelector('#card');
//получаем тег в который вложим содержимое темплейт
const cardContainer = document.querySelector('.cards');
//инпуты места и ссылки
const mestoInput = document.querySelector('.popup__input-text_type_mesto');
const linkInput = document.querySelector('.popup__input-text_type_link');
const cardMesto = document.querySelector('.card__name');
const cardLink = document.querySelector('.card__photo');
//форма попапа добавления карточек
const formPopupAddCard = document.querySelector('.popup__form-card');
//-----------Третий попап Развернуть карточку----------------------
const popupExpandCard = document.querySelector('.popup__expand-card');
console.log(popupExpandCard);

const createCards = (element) => {
  const card = templateCards
  .content.querySelector('.card')
  .cloneNode(true);
  card.querySelector('.card__photo').src = element.link;
  card.querySelector('.card__name').textContent = element.name;
  card.querySelector('.card__like').addEventListener('click',function  (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  card.querySelector('.card__delete').addEventListener('click', function(evt){
    evt.target.closest('.card').remove();
  });
  card.querySelector('.card__photo').addEventListener('click', function () {
    document.querySelector('.popup__photo').src = element.link;
    document.querySelector('.popup__photo-name').textContent = element.name;
    openPopup(popupExpandCard);
  });
  document.querySelector('.popup__close_expand_card').addEventListener('click', function () {
    closePopup(popupExpandCard);
  });
  
  return card;
};

const renderCard = (element) => {
  cardContainer.append(createCards(element));
};

const renderCardPopup = (element) => {
  cardContainer.prepend(createCards(element));
};
initialCards.forEach(renderCard);
// initialCards.forEach((element) => {
//   renderCard(element);
// });
//-----------------Добавление новой карточки из попапа---------------
const AddCard = (event) => {
  event.preventDefault();
  // cardMesto.textContent = mestoInput.value;
  // cardLink.src = linkInput.value;
  const element = {
    name: mestoInput.value,
    link: linkInput.value
  };
  renderCardPopup(element);
  mestoInput.value = '';
  linkInput.value = '';
  closePopup(popupAddCard);
}
formPopupAddCard.addEventListener('submit', AddCard);
/*

  //-----------Активная кнопка лайка--------------------------------
  //найдем кнопку лайк
  const likeItem = document.querySelector('.card__like');
  //лайк при клике станет черный и обратно
  likeItem.addEventListener('click', function () {
    likeItem.classList.toggle('.card__like_active');
  });

    //------------------Удаление карточки-----------------------------------------------
  //находим кнопку удаления карточки
  const btnDeleteCard = document.querySelector('.card__delete');
  //навешиваем слушать клика с функцией удаления
  btnDeleteCard.addEventListener('click', function(){
    btnDeleteCard.closest('.card').remove();
  });
*/



