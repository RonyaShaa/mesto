
let profileButton = document.querySelector ('.profile__button');
let popup = document.querySelector ('.popup');
let popupClose = document.querySelector ('.popup__close');
let popupContainer = document.querySelector ('.popup__container');
let buttonSave = document.querySelector ('.popup__button');
let formElement = document.querySelector('.profile__info');
let nameInput = document.querySelector('.popup__input-text_type_name');
let interestsInput =  document.querySelector('.popup__input-text_type_interests');
let profileName = document.querySelector('.profile__name');
let profileInterests = document.querySelector('.profile__interests');
let formPopup = document.querySelector('.popup__form');


profileButton.addEventListener('click', openPopup);

function openPopup(event) {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  interestsInput.value = profileInterests.textContent;
}

popupClose.addEventListener('click', closePopup);

function closePopup(event) {
  popup.classList.remove('popup_opened');
}

formPopup.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInterests.textContent = interestsInput.value;
  closePopup();
}

