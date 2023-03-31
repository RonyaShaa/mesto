class UserInfo{
  constructor({name, about}){
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
  }
//метод возвращает объект с данными пользователя
  getUserInfo(){
    return {
      name: this._name.textContent,
      about: this._about.textContent
    };
  }
// метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userData){
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
  }

}

export default UserInfo;