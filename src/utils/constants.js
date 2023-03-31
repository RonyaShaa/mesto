 //универсальный конфиг валидации
 export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-disabled',  
  inputErrorClass: 'popup__input-text_type_error',   //стили для класса невалидного инпута  
  errorClass: 'popup__error', //класс спана с ошибкой
};

//кнопка открыть попап 'Добавить карточку'
export const btnAddCard = document.querySelector('.profile__add-photo');
//кнопка открыть попап Редактировать профиль
export const btnEditProfile = document.querySelector('.profile__button');
//форма попап Редактировать профиль
export const profileForm = document.querySelector('.popup__form');
//форма попап Добавить карточку
export const formPopupAddCard = document.querySelector('.popup__form-card');
//инпуты имя профиля и интересы
export const nameInput = document.querySelector('.popup__input-text_type_name');
export const interestsInput =  document.querySelector('.popup__input-text_type_interests');

export let userID;
