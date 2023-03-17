 //универсальный конфиг валидации
 export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-disabled',  
  inputErrorClass: 'popup__input-text_type_error',   //стили для класса невалидного инпута  
  errorClass: 'popup__error', //класс спана с ошибкой
};

//нашли форму попапа редактировать профиль
export const profileForm = document.querySelector('.popup__form');
//нашли кнопку Редактировать профиль
export const btnEditProfile = document.querySelector('.profile__button');
//инпуты имя профиля и  интересы
export const nameInput = document.querySelector('.popup__input-text_type_name');
export const interestsInput =  document.querySelector('.popup__input-text_type_interests');
//нашли кнопку открыть попап 'Добавить карточку'
export const btnAddCard = document.querySelector('.profile__add-photo');
//форма попапа добавления карточек
export const formPopupAddCard = document.querySelector('.popup__form-card');

