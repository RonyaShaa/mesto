import Card from "../components.js/Card.js";
import FormValidator from "../components.js/FormValidator.js";
import { initialCards } from "../components.js/initialCards.js";
import Section from "../components.js/Section.js";
import PopupWithImage from "../components.js/PopupWithImage.js";
import PopupWithForm from "../components.js/PopupWithForm.js";
import UserInfo from "../components.js/UserInfo.js";

 //универсальный конфиг валидации
 const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-disabled',  
  inputErrorClass: 'popup__input-text_type_error',   //стили для класса невалидного инпута  
  errorClass: 'popup__error', //класс спана с ошибкой
};

//нашли форму попапа редактировать профиль
const profileForm = document.querySelector('.popup__form');
//нашли кнопку Редактировать профиль
const btnEditProfile = document.querySelector('.profile__button');
//инпуты имя профиля и  интересы
const nameInput = document.querySelector('.popup__input-text_type_name');
const interestsInput =  document.querySelector('.popup__input-text_type_interests');
//нашли кнопку открыть попап 'Добавить карточку'
const btnAddCard = document.querySelector('.profile__add-photo');
//форма попапа добавления карточек
const formPopupAddCard = document.querySelector('.popup__form-card');



//экземпляр попап развернуть карточку
const PopupWithBigImage = new PopupWithImage('.popup_type_expand-card');
PopupWithBigImage.setEventListeners();
//функция развернуть карточку
const handleExpandCard = (name, link) => {
  PopupWithBigImage.open(name, link);
}

//валидируем форму редактировать профиль
const profileFormValidator = new FormValidator(validationConfig,profileForm);
profileFormValidator.enableValidation();
//валидируем форму добавить карточку
const addCardFormValidator = new FormValidator(validationConfig,formPopupAddCard);
addCardFormValidator.enableValidation();

//добавим дефолтные карточки на страницу
const section = new Section ({
  items: initialCards, 
  renderer: (item) => {
    const card = new Card(item,'#card',handleExpandCard);
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
      // Добавляем в DOM
      //console.log(cardElement);
      section.addItem(cardElement);
      //console.log(section.addItem(cardElement));
  }
}, '.cards');
section.renderItems();

//экземпляр юзеринфо
const userInfo = new UserInfo({name: '.profile__name', interests: '.profile__interests'});

//экземпляр попап редактировать профиль
const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: ({name, interests}) => {
    userInfo.setUserInfo(name, interests);
    popupProfile.close();
  }
});
popupProfile.setEventListeners();

//функция открыть попап  редактировать профиль
const clickBtnEditProfile = () => {
  nameInput.value = userInfo.getUserInfo().name;
  interestsInput.value = userInfo.getUserInfo().interests;
  popupProfile.open();
  profileFormValidator.resetValidation();
};

//слушатель клика по кнопке Редактировать профиль с вызовом функции открыть попап 
btnEditProfile.addEventListener('click', clickBtnEditProfile);


//экземпляр попап добавить карточку
const popupAddNewCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (item) => {
    const card = new Card(item,'#card',handleExpandCard);
    const cardElement = card.generateCard();
      // Добавляем в DOM
      section.prependItem(cardElement);
    popupAddNewCard.close();
  }
});
popupAddNewCard.setEventListeners();

//слушатель клика по кнопке 'Добавить карточку' с вызовом функции открыть попап
btnAddCard.addEventListener('click',  () => {
  popupAddNewCard.open();
});