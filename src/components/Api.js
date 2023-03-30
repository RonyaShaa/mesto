class Api {
  constructor(config){
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
    
  }

  _checkResponse = (res) => {
    if(res.ok) {
      //возвращаем ответ сервера
      return res.json(); 
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  };

  //загрузка информации о пользователе с сервера
   getUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse);
   }

  //загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  //редактирование данных профиля
  editUserInfo({name, about}){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body:  JSON.stringify({name, about})
    })
    .then(this._checkResponse);
  }

  //добавление новой карточки
  addNewCard(dataCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body:  JSON.stringify({
        name: dataCard.name,
        link: dataCard.link,
      })
    })
    .then(this._checkResponse);
  }
  
  //лайки
   likes() {

  }
  //удаление карточки
  deleteCard(){

  }
  //обновление аватара пользователя
  editAvatar() {

  }
}

export default Api;