// //----------------------6-sprint-------------------------------------------

 //универсальный конфиг
 const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-disabled',  
  inputErrorClass: 'popup__input-text_type_error',   //стили для класса невалидного инпута  
  errorClass: 'popup__error', //класс спана с ошибкой
};

//функция отмены отправки формы на сервер
function preventDefault(evt) {
  evt.preventDefault();
};

//функция включения валидации
function enableValidation (config) {
  //найдем массив форм
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  //переберем каждую форму
  formList.forEach((form) => {
    form.addEventListener('submit', preventDefault);
    //добавим слушатель на каждое изменение в инпуте и вызовем функцию блокировки и разблокировки кнопки сабмит
    form.addEventListener('input', () => {
      toggleButton(form, config);
    });
  
    addInputListeners(form, config);
    // деактивируем кнопку при 1й загрузке сайта
    toggleButton(form, config);

    form.addEventListener('reset', () => {
      // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      setTimeout(() => {
       toggleButton(form, config);
      }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
    });
  });
};

/**
 * Обработать ввод в input
 * @param {*} evt событие input
 * @param {*} config конфиг
 */
function handleFormInput (evt, config) {
  const input = evt.target;
  //найдем инпут айди
  const inputId = input.id;
  //найдем спан который привязан к этому инпуту
  const errorElement = document.querySelector(`#${inputId}-error`);
  
  //если инпут валидный 
  if (input.validity.valid) { 
    //убираем класс с красным бордером
    input.classList.remove(config.inputErrorClass);
    //убираем текст ошибки
    errorElement.textContent = '';
  //если инпут не валидный
  } else {
    //добавим класс с красным бордером
    input.classList.add(config.inputErrorClass);
    //добавим текст ошибки 
    errorElement.textContent = input.validationMessage;
  }
};

//функция блокирует и разблокирует кнопку
function toggleButton(form, config) {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  //проверим валидна ли форма
  const isFormValid = form.checkValidity();
  //заблокируем кнопку если форма не валидна
  buttonSubmit.disabled = !isFormValid;
  //класс неактивной кнопки
  buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

/**
 * Добавить слушатель на поля ввода(инпуты)
 * @param {*} form 
 * @param {*} config 
 */
function addInputListeners(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector); //вернет коллекцию DOM элементов - список инпутов || Array.from(form.querySelectorAll(config.inputSelector)); в этом случае вернет массив  
  //берем и проходим по каждому инпуту, и повесим обработчик события
  inputList.forEach(function (item) {  //функция колбэк в качестве параметра принимает каждый инпут
    //добавим слушатель события инпутам
    item.addEventListener('input', (evt) => {
      handleFormInput(evt,config)
    });
  });
};

//вызовем функцию включения валидации
enableValidation(validationConfig);

