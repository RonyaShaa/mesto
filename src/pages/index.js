import "./index.css";
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  validationConfig,
  profileForm,
  btnEditProfile,
  nameInput,
  interestsInput,
  btnAddCard,
  formPopupAddCard,
  btnEditAvatar,
  avatarForm,
} from "../utils/constants.js";
let userId;

//функция развернуть карточку
const handleExpandCard = (name, link) => {
  popupWithBigImage.open(name, link);
}

//экземпляр попап развернуть карточку
const popupWithBigImage = new PopupWithImage('.popup_type_expand-card');
popupWithBigImage.setEventListeners();

//валидируем форму редактировать профиль
const profileFormValidator = new FormValidator(validationConfig,profileForm);
profileFormValidator.enableValidation();
//валидируем форму добавить карточку
const addCardFormValidator = new FormValidator(validationConfig,formPopupAddCard);
addCardFormValidator.enableValidation();
//валидируем форму Релактировать аватар
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.enableValidation();

//функция создания карточки
const createCard = (item) => {
  const card = new Card(item,'#card',handleExpandCard, popupWithSubmit, userId, 
  {
    handleLikeClick: () => {
      if(card.isCardLike()) {
        api.deleteLike(card.getCardId())
        .then((data) => {
          card.setLikesCount(data.likes);
          card.deleteLike();
          card.likes = data.likes;
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
      } else {
        api.putLike(card.getCardId())
        .then((data) => {
          card.setLikesCount(data.likes); 
          card.setLike();
          card.likes = data.likes;
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
      }
    }
  });
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  return cardElement;
}

//добавим дефолтные карточки на страницу
const section = new Section ({
  renderer: (item) => {
    //вызываем функцию создания карточки
    const cardElement = createCard(item);
    // Добавляем в DOM
    section.addItem(cardElement);
  }
}, '.cards');

// экземпляр юзеринфо
const userInfo = new UserInfo({name: '.profile__name', about: '.profile__interests', avatar: '.profile__photo'});

//экземпляр апи
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    'content-type': 'application/json',
    authorization: '42690f73-759c-4798-9db6-9b61cef90de2',
  }
});

//запрашиваем у сервера данные о пользователе и исходные карточки
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(data => {
    const userData = data[0];//получим данные о пользователе
    const cardData = data[1];//получим карточки с сервера
    userId = userData._id; //получим айди пользователя
    userInfo.setUserInfo(userData);//вернем данные о пользователе
    section.renderItems(cardData);//вернем исходные карточки
})
.catch((err) => {
   console.log(err); // выведем ошибку в консоль
});

//экземпляр попап редактировать профиль
const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (userData) => {
    popupProfile.renderLoading('Сохранение...');
    //сюда приходят новые данные из инпутов(name,about)
    api.editUserInfo(userData) //вызываем метод патч чтобы внести изменения и на сервере
    .then((userData) => {
      userInfo.setUserInfo(userData); //обрабатываем данные и возвращаем
       //закрываем попап
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
   })
   .finally(()=>{
     popupProfile.renderLoading('Сохранить')
   });
  }
});
popupProfile.setEventListeners();

//функция открыть попап  редактировать профиль
const clickBtnEditProfile = () => {
  const {name,about} = userInfo.getUserInfo()
  nameInput.value = name;
  interestsInput.value =about;
  popupProfile.open();
  profileFormValidator.resetValidation();
};

//слушатель клика по кнопке Редактировать профиль с вызовом функции открыть попап 
btnEditProfile.addEventListener('click', clickBtnEditProfile);

//экземпляр попап добавить карточку
const popupAddNewCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (cardData) => {
    popupAddNewCard.renderLoading('Сохранение...');
    //сюда приходят данные с инпутов формы(name,link)
    api.addNewCard(cardData)//вызываем метод post чтобы добавить на сервер новую карточку
    .then((cardData) => {
       //вызываем функцию создания карточки
       const cardElement = createCard(cardData);
       // Добавляем в DOM
       section.prependItem(cardElement);
       //закрываем попап
       popupAddNewCard.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
   })
    .finally(()=>{
      popupAddNewCard.renderLoading('Сохранить')
    });
    // //закрываем попап
    // popupAddNewCard.close();
  }
});
popupAddNewCard.setEventListeners();

//слушатель клика по кнопке 'Добавить карточку' с вызовом функции открыть попап
btnAddCard.addEventListener('click',  () => {
  popupAddNewCard.open();
  addCardFormValidator.resetValidation();
});

//экземпляр попапа подтверждения удаления карточки
const popupWithSubmit = new PopupWithSubmit({
  popupSelector: '.popup_type_delete-card',
  handleWithSubmit: (cardId, card)=> {
    popupWithSubmit.renderLoading('Удаление...');
    api.deleteCard(cardId)
    .then(()=> {
      popupWithSubmit.close();
      card.handleDeleteClick();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
   })
   .finally(()=>{
      popupWithSubmit.renderLoading('Да')
   });
  }
});
popupWithSubmit.setEventListeners();

//экземпляр попапа Редактировать аватaрку
const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar',
  //сюда в cardData приходит ссылка на аватарку из инпута
  handleFormSubmit: (cardData) => {
    console.log(cardData);
    api.editAvatar(cardData)
    .then((cardData) => {
      userInfo.editAvatar(cardData);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
   });
  }
});
popupEditAvatar.setEventListeners();

//cлушаем кнопку Редактировать аватар
btnEditAvatar.addEventListener('click',  () => {
  popupEditAvatar.open();
  avatarFormValidator.resetValidation();
});