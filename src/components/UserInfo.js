export class UserInfo {
    constructor(name, description, avatar){
        this._name = document.querySelector(name);
        this._description = document.querySelector(description);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo(){
        return {
            name:  this._name.textContent,
            description: this._description.textContent,
        }
    }

    setUserInfo(fromName, fromDescription){
        this._name.textContent = fromName;
        this._description.textContent = fromDescription;
    }

    setUserAvatar(formAvatar){
        this._avatar.src = formAvatar;
    }

}