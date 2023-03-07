//-----------------------7-sprint-------------------------------------------
 class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  };
  
//метод включения валидации
  enableValidation() {
    this._form.addEventListener('submit', this._preventDefault);
    //добавим слушатель на каждое изменение в инпуте и вызовем функцию блокировки и разблокировки кнопки сабмит
    this._form.addEventListener('input', () => {
      this._toggleButton(this._form, this._config);
    });
  
    this._addInputListeners(this._form, this._config);
    // деактивируем кнопку при 1й загрузке сайта
    this._toggleButton(this._form, this._config);

    this._form.addEventListener('reset', () => {
      // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      setTimeout(() => {
       this._toggleButton(this._form, this._config);
      }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
    });
  };
  
  //метод для очистки ошибок
  resetValidation() {
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));// вернет массив инпутов
    //берем и проходим по каждому инпуту, и повесим обработчик события
    this._inputList.forEach( (input) => {

    //найдем спан который привязан к этому инпуту и убираем текст ошибки
      this._errorElement = document.querySelector(`#${input.id}-error`).textContent = '';
        //убираем класс с красным бордером
      input.classList.remove(this._config.inputErrorClass);
    });
    //блокируем кнопку
    this._toggleButton(this._form, this._config);
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
      //убираем класс с красным бордером
      this._input.classList.remove(this._config.inputErrorClass);
      //убираем текст ошибки
      this._errorElement.textContent = '';
    //если инпут не валидный
    } else {
      //добавим класс с красным бордером
      this._input.classList.add(this._config.inputErrorClass);
      //добавим текст ошибки 
      this._errorElement.textContent = this._input.validationMessage;
    };
  };

  //метод блокирует и разблокирует кнопку
  _toggleButton(){
    this._buttonSubmit = this._form.querySelector(this._config.submitButtonSelector);
    //проверим валидна ли форма
    this._isFormValid = this._form.checkValidity();
    //заблокируем кнопку если форма не валидна
    this._buttonSubmit.disabled = !this._isFormValid;
    //класс неактивной кнопки
    this._buttonSubmit.classList.toggle(this._config.inactiveButtonClass, !this._isFormValid);
  };

  _addInputListeners(){
    this._inputList = this._form.querySelectorAll(this._config.inputSelector); //вернет коллекцию DOM элементов - список инпутов || Array.from(form.querySelectorAll(config.inputSelector)); в этом случае вернет массив  
    //берем и проходим по каждому инпуту, и повесим обработчик события
    this._inputList.forEach( (item) => {  //функция колбэк в качестве параметра принимает каждый инпут
      //добавим слушатель события инпутам
      item.addEventListener('input', (evt) => {
        this._handleFormInput(evt,this._config);
      });
    });
  };
}

export default FormValidator;

