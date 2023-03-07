import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//-----------------------------4-sprint---------------------------------

//нашли кнопку Редактировать профиль
const btnEditProfile = document.querySelector('.profile__button');
//нашли попап редактирования профиля
//let popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile')
//нашли кнопку закрыть попап ред.профиля
const profileCloseButton = document.querySelector('.popup__close');
//инпуты имя профиля и  интересы
const nameInput = document.querySelector('.popup__input-text_type_name');
const  interestsInput =  document.querySelector('.popup__input-text_type_interests');
//имя профиля и интересы в секции(где  будет меняться)
const profileName = document.querySelector('.profile__name');
const profileInterests = document.querySelector('.profile__interests');
//нашли форму попапа редактировать профиль
const profileForm = document.querySelector('.popup__form');

//-----------Универсальные функции Открыть/Закрыть попап--------------------------------
//функция открытия попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  
  document.addEventListener('keydown', closePopupByEsc);
};

//функция закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupByEsc);
};
//----------------------6-sprint-------------------------------------------
//найдем все попапы
const popups = Array.from(document.querySelectorAll('.popup'));

//функция закрытия попапов по по клику на Esc
const closePopupByEsc = (evt) => {
  popups.forEach((popup)=> {
    if(evt.key === 'Escape') {
      closePopup(popup);
    };
  });
};

//закрытие попапов по клику на оверлей и крестик
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    };
  });
});

//-----------Первый попап Редактировать профиль--------------------------------


const clickBtnEditProfile = function () {
  nameInput.value = profileName.textContent;
  interestsInput.value = profileInterests.textContent;
  openPopup(popupEditProfile);
  editProfileForm.resetValidation();
};
//слушатель клика по кнопке Редактировать профиль с вызовом функции открыть попап 
btnEditProfile.addEventListener('click', clickBtnEditProfile);

//слушатель сабмит формы попап
profileForm.addEventListener('submit', handleFormSubmitEditProfile);

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

//слушатель клика по кнопке 'Добавить карточку' с вызовом функции открыть попап
btnAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
});

//-----------Добавление карточек из массива-------------------------------

//найдем темплейт карточки
const templateCards = document.querySelector('#card');
//получаем тег в который вложим содержимое темплейт
const cardContainer = document.querySelector('.cards');
//инпуты места и ссылки
const mestoInput = document.querySelector('.popup__input-text_type_mesto');
const linkInput = document.querySelector('.popup__input-text_type_link');
// const cardMesto = document.querySelector('.card__name');
// const cardPhoto = document.querySelector('.card__photo');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoName = document.querySelector('.popup__photo-name');
//форма попапа добавления карточек
const formPopupAddCard = document.querySelector('.popup__form-card');

//Третий попап Развернуть карточку
const popupExpandCard = document.querySelector('.popup_type_expand-card');

//----------7-sprint-------------------------------------------
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

//функция развернуть карточку
const handleExpandCard = (name,link) => {
  popupPhoto.src = link;
  popupPhoto.alt = name;
  popupPhotoName.textContent = name;
  openPopup(popupExpandCard);
};

//функция отрисовывает карточки
const renderCard = ((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item,'#card',handleExpandCard);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
    // Добавляем в DOM
    cardContainer.prepend(cardElement);
});

//пройдем по массиву и отрисуем карточки
initialCards.forEach(renderCard);

//-----------------Добавление новой карточки из попапа---------------
const addCard = (event) => {
  event.preventDefault();
  const element = {
    name: mestoInput.value,
    link: linkInput.value
  };
  renderCard(element);
  closePopup(popupAddCard);
  formPopupAddCard.reset();
}
formPopupAddCard.addEventListener('submit', addCard);

//----------------------6-sprint-------------------------------------------

 //универсальный конфиг валидации
 const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-disabled',  
  inputErrorClass: 'popup__input-text_type_error',   //стили для класса невалидного инпута  
  errorClass: 'popup__error', //класс спана с ошибкой
};

//----------------------7-sprint-------------------------------------------
const editProfileForm = new FormValidator(validationConfig,profileForm);
editProfileForm.enableValidation();
const editFormPopupAddCard = new FormValidator(validationConfig,formPopupAddCard);
editFormPopupAddCard.enableValidation();