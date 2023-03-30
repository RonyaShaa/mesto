class UserInfo{
  constructor({name, interests}){
    this._name = document.querySelector(name);
    this._interests = document.querySelector(interests)
  }
//метод возвращает объект с данными пользователя
  getUserInfo(){
    return {
      name: this._name.textContent,
      interests: this._interests.textContent
    };
  }
// метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userData){
    this._name.textContent = userData.name;
    this._interests.textContent = userData.about;
  }
}

export default UserInfo;