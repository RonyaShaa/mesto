import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import Section from "./Section.js";
//import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

 //универсальный конфиг валидации
 const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-disabled',  
  inputErrorClass: 'popup__input-text_type_error',   //стили для класса невалидного инпута  
  errorClass: 'popup__error', //класс спана с ошибкой
};


//нашли кнопку Редактировать профиль
const btnEditProfile = document.querySelector('.profile__button');
//нашли попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile')

//инпуты имя профиля и  интересы
const nameInput = document.querySelector('.popup__input-text_type_name');
const interestsInput =  document.querySelector('.popup__input-text_type_interests');
//имя профиля и интересы в секции(где  будет меняться)
const profileName = document.querySelector('.profile__name');
const profileInterests = document.querySelector('.profile__interests');
//нашли форму попапа редактировать профиль
const profileForm = document.querySelector('.popup__form');

//-----------Универсальные функции Открыть/Закрыть попап--------------------------------
// //функция открытия попап
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
  
//   document.addEventListener('keydown', closePopupByEsc);
// };

// //функция закрытия попап
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');

//   document.removeEventListener('keydown', closePopupByEsc);
// };
// //----------------------6-sprint-------------------------------------------
// //найдем все попапы
// const popups = Array.from(document.querySelectorAll('.popup'));

// //функция закрытия попапов по по клику на Esc
// const closePopupByEsc = (evt) => {
//   popups.forEach((popup)=> {
//     if(evt.key === 'Escape') {
//       closePopup(popup);
//     };
//   });
// };

// //закрытие попапов по клику на оверлей и крестик
// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup_opened')) {
//       closePopup(popup);
//     };
//     if (evt.target.classList.contains('popup__close')) {
//       closePopup(popup);
//     };
//   });
// });
//функция обработки сабмит попапа Редактировать профиль с вызовом функции закрытия попап 
// function handleFormSubmitEditProfile(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileInterests.textContent = interestsInput.value;
//   closePopup(popupEditProfile);
// }

//слушатель сабмит формы попап
//profileForm.addEventListener('submit', handleFormSubmitEditProfile);

//пройдем по массиву и отрисуем карточки
//initialCards.forEach(renderCard);

//-----------------Добавление новой карточки из попапа---------------
// const addCard = (event) => {
//   event.preventDefault();
//   const element = {
//     name: mestoInput.value,
//     link: linkInput.value
//   };
//   renderCard(element);
//   close(popupAddCard);
//   formPopupAddCard.reset();
// }
// formPopupAddCard.addEventListener('submit', addCard);

//функция развернуть карточку
// const handleExpandCard = (name,link) => {
//   popupPhoto.src = link;
//   popupPhoto.alt = name;
//   popupPhotoName.textContent = name;
//   popupExpandCard.open();
// };
//нашли попап Добавить карточку
const popupAddCard = document.querySelector('.popup_type_add-card');
//нашли кнопку открыть попап 'Добавить карточку'
const btnAddCard = document.querySelector('.profile__add-photo');
//получаем тег в который вложим содержимое темплейт
const cardContainer = document.querySelector('.cards');
//инпуты места и ссылки
const mestoInput = document.querySelector('.popup__input-text_type_mesto');
const linkInput = document.querySelector('.popup__input-text_type_link');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoName = document.querySelector('.popup__photo-name');
//форма попапа добавления карточек
const formPopupAddCard = document.querySelector('.popup__form-card');
//Третий попап Развернуть карточку
const popupExpandCard = document.querySelector('.popup_type_expand-card');




// //функция отрисовывает карточки
// const renderCard = ((item) => {
//   // Создадим экземпляр карточки
//   const card = new Card({
//     data: item,
//     handleExpandCard: (item) => {
//       popupExpandCard.open(item.link, item.name);
//     }
//   }, '#card');
//   // Создаём карточку и возвращаем наружу
//   const cardElement = card.generateCard();
//     // Добавляем в DOM
//     section.addItem(cardElement);
// });

//валидируем форму редактировать профиль
const profileFormValidator = new FormValidator(validationConfig,profileForm);
profileFormValidator.enableValidation();
//валидируем форму добавить карточку
const addCardFormValidator = new FormValidator(validationConfig,formPopupAddCard);
addCardFormValidator.enableValidation();


//добавим карточки на страницу
const section = new Section ({
  items: initialCards, 
  renderer: (item) => {
    // Создадим экземпляр карточки
    const card = new Card({
      data: item,
      handleExpandCard: (item) => {
        popupExpandCard.open(item.link, item.mesto);
      }
    }, '#card');
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
      // Добавляем в DOM
      console.log(cardElement);
      section.addItem(cardElement);
      console.log(section.addItem(cardElement));
  }
}, '.cards');
section.renderItems();


//экземпляр попап развернуть карточку
const PopupWithBigImage = new PopupWithImage('.popup_type_expand-card');
PopupWithBigImage.setEventListeners();

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
    // console.log(formData);
    //section.addItem(formData);
    const card = new Card({
      data: item,
      handleExpandCard: (item) => {
        popupExpandCard.open(item.link, item.mesto);
      }
    }, '#card');
    const cardElement = card.generateCard();
      // Добавляем в DOM
      console.log(cardElement);
      section.addItem(cardElement);
      //console.log(section.addItem(cardElement));
    popupAddNewCard.close();
  }
});
popupAddNewCard.setEventListeners();

//слушатель клика по кнопке 'Добавить карточку' с вызовом функции открыть попап
btnAddCard.addEventListener('click',  () => {
  popupAddNewCard.open();
});




