
//-----------------------------4-sprint---------------------------------

//нашли кнопку Редактировать профиль
const btnEditProfile = document.querySelector('.profile__button');
//нашли попап редактирования профиля
//let popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile')
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
formPopup.addEventListener('submit', handleFormSubmitEditProfile);

//функция обработки сабмит попапа Редактировать профиль с вызовом функции закрытия попап 
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInterests.textContent = interestsInput.value;
  closePopup(popupEditProfile);
}

//----------------------5-sprint-------------------------------------------


//-----------Второй попап Добавить карточку--------------------------------

//нашли попап Добавить карточку
const popupAddCard = document.querySelector('.popup_type_add-card');
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

//найдем темплейт карточки
const templateCards = document.querySelector('#card');
//получаем тег в который вложим содержимое темплейт
const cardContainer = document.querySelector('.cards');
//инпуты места и ссылки
const mestoInput = document.querySelector('.popup__input-text_type_mesto');
const linkInput = document.querySelector('.popup__input-text_type_link');
const cardMesto = document.querySelector('.card__name');
const cardLink = document.querySelector('.card__photo');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoName = document.querySelector('.popup__photo-name');
//форма попапа добавления карточек
const formPopupAddCard = document.querySelector('.popup__form-card');
//-----------Третий попап Развернуть карточку----------------------
const popupExpandCard = document.querySelector('.popup_type_expand-card');
//закрытие третьего попапа по клику на крестик
document.querySelector('.popup__close_expand_card').addEventListener('click', function () {
  closePopup(popupExpandCard);
});

const createCards = ({name, link}) => {
  const card = templateCards
  .content.querySelector('.card')
  .cloneNode(true);
  card.querySelector('.card__photo').src = link;
  card.querySelector('.card__name').textContent = name;
  card.querySelector('.card__like').addEventListener('click',function  (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  card.querySelector('.card__delete').addEventListener('click', function(evt){
    evt.target.closest('.card').remove();
  });
  card.querySelector('.card__photo').addEventListener('click', function () {
    popupPhoto.src = link;
    popupPhotoName.textContent = name;
    openPopup(popupExpandCard);
  });
  return card;
};

const renderCard = ({name, link}) => {
  cardContainer.append(createCards({name, link}));
};

const renderCardPopup = ({name, link}) => {
  cardContainer.prepend(createCards({name, link}));
};
initialCards.forEach(renderCard);


//-----------------Добавление новой карточки из попапа---------------
const addCard = (event) => {
  event.preventDefault();
  const element = {
    name: mestoInput.value,
    link: linkInput.value
  };
  renderCardPopup(element);
  closePopup(popupAddCard);
  formPopupAddCard.reset();
}
formPopupAddCard.addEventListener('submit', addCard);




