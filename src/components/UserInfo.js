class UserInfo{
  constructor({name, about, avatar}){
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
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
    this.editAvatar(userData);
  }

  
  editAvatar(userData) {
    this._avatar.src = userData.avatar;
  }
}

export default UserInfo;