 class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));// вернет массив инпутов
    this._buttonSubmit = this._form.querySelector(this._config.submitButtonSelector);
  };
  
//метод включения валидации
  enableValidation() {
    this._form.addEventListener('submit', this._preventDefault);
    //добавим слушатель на каждое изменение в инпуте и вызовем функцию блокировки и разблокировки кнопки сабмит
    this._form.addEventListener('input', () => {
      this._toggleButton();
    });
  
    this._addInputListeners(this._form, this._config);
    // деактивируем кнопку при 1й загрузке сайта
    this._toggleButton();

    this._form.addEventListener('reset', () => {
      // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      setTimeout(() => {
       this._toggleButton();
      }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
    });
  };
  
  //метод для очистки ошибок
  resetValidation() {
    //проходим по каждому инпуту, и повесим обработчик события
    this._inputList.forEach( (input) => {
      //вызовем метод скрытия спана ошибки
      this._hideInputError(input);
    });
    //блокируем кнопку
    this._toggleButton();
  };

  //метод отмены отправки формы на сервер
  _preventDefault(evt) {
    evt.preventDefault();
  };

  //метод обработки ввода в input
  _handleFormInput(evt){
    this._input = evt.target;
    //найдем инпут айди
    this._inputId = this._input.id;
    //найдем спан который привязан к этому инпуту
    this._errorElement = document.querySelector(`#${this._inputId}-error`);
    
    //если инпут валидный 
    if (this._input.validity.valid) { 
      this._hideInputError(this._input);
    //если инпут не валидный
    } else {
      //добавим класс с красным бордером
      this._input.classList.add(this._config.inputErrorClass);
      //добавим текст ошибки 
      this._errorElement.textContent = this._input.validationMessage;
    };
  };
  
  //метод скрытия спана ошибки
  _hideInputError(input){
    //найдем спан который привязан к этому инпуту
    this._errorElement = document.querySelector(`#${input.id}-error`);
    //убираем класс с красным бордером
    input.classList.remove(this._config.inputErrorClass);
    //убираем текст ошибки
    this._errorElement.textContent = '';
  };

  //метод блокирует и разблокирует кнопку
  _toggleButton(){
    //проверим валидна ли форма
    this._isFormValid = this._form.checkValidity();
    //заблокируем кнопку если форма не валидна
    this._buttonSubmit.disabled = !this._isFormValid;
    //класс неактивной кнопки
    this._buttonSubmit.classList.toggle(this._config.inactiveButtonClass, !this._isFormValid);
  };

  _addInputListeners(){
    //проходим по каждому инпуту, и повесим обработчик события
    this._inputList.forEach( (item) => {  //функция колбэк в качестве параметра принимает каждый инпут
      //добавим слушатель события инпутам
      item.addEventListener('input', (evt) => {
        this._handleFormInput(evt,this._config);
      });
    });
  };
}

export default FormValidator;

