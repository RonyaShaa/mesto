
let profileButton = document.querySelector ('.profile__button');
let popup = document.querySelector ('.popup');
let popupClose = document.querySelector ('.popup__close');
let popupContainer = document.querySelector ('.popup__container');
let buttonSave = document.querySelector ('.popup__button');
let formElement = document.querySelector('.profile__info');
let nameInput = document.querySelector('.popup__input-text_name');
let interestsInput =  document.querySelector('.popup__input-text_interests');
let profileName = document.querySelector('.profile__name');
let profileInterests = document.querySelector('.profile__interests');


profileButton.addEventListener('click', openPopup);

function openPopup(event) {
  event.preventDefault();
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  interestsInput.value = profileInterests.textContent;
}
console.log(openPopup);

popupClose.addEventListener('click', closePopup);

function closePopup(event) {
  event.preventDefault();
  popup.classList.remove('popup_opened');
  profileName.textContent = nameInput.value;
  profileInterests.textContent = interestsInput.value;
}

popup.addEventListener('click', function(event) {
  if (!event.defaultPrevented) {
    closePopup();
  }
});

popupContainer.addEventListener('click', function(event) {
  event.preventDefault();
});

buttonSave.addEventListener('click', closePopup);

