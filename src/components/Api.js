class Api {
  constructor(config){
    this._url = config.url;
    this._headers = config.headers;
    
  }
  //загрузка информации о пользователе с сервера
   getUserInfo(){
    // return fetch(`${this._url}/users/me`, {
    //   method: 'GET',
    //   headers: this._headers,
    // })
    // .then((res) => {
    //   if(res.ok) {
    //     return res.json(); 
    //   }
    //   return Promise.reject(`Ошибка: ${res.status}`)
    // });
   }
  //загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => {
      if(res.ok) {
        return res.json(); 
      }
      
      return Promise.reject(`Ошибка: ${res.status}`)
    });
  }
  //добавление новой карточки
  addNewCard(data) {

  }
  //редактирование профиля
  editProfileInfo(){

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