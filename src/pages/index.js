import "./index.css";
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../utils/initialCards.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  validationConfig,
  profileForm,
  btnEditProfile,
  nameInput,
  interestsInput,
  btnAddCard,
  formPopupAddCard
} from "../utils/constants.js";

//экземпляр попап развернуть карточку
const popupWithBigImage = new PopupWithImage('.popup_type_expand-card');
popupWithBigImage.setEventListeners();
//функция развернуть карточку
const handleExpandCard = (name, link) => {
  popupWithBigImage.open(name, link);
}

//функция создания карточки
const createCard = (item) => {
  const card = new Card(item,'#card',handleExpandCard);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  return cardElement;
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
    //вызываем функцию создания карточки
    const cardElement = createCard(item);
    // Добавляем в DOM
    section.addItem(cardElement);
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

  const {interests, name} = userInfo.getUserInfo()
  nameInput.value = name;
  interestsInput.value = interests;
  popupProfile.open();
  profileFormValidator.resetValidation();
};

//слушатель клика по кнопке Редактировать профиль с вызовом функции открыть попап 
btnEditProfile.addEventListener('click', clickBtnEditProfile);


//экземпляр попап добавить карточку
const popupAddNewCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (item) => {
    //вызываем функцию создания карточки
    const cardElement = createCard(item);
      // Добавляем в DOM
      section.prependItem(cardElement);
    popupAddNewCard.close();
  }
});
popupAddNewCard.setEventListeners();

//слушатель клика по кнопке 'Добавить карточку' с вызовом функции открыть попап
btnAddCard.addEventListener('click',  () => {
  popupAddNewCard.open();
  addCardFormValidator.resetValidation();
});