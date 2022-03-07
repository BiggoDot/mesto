export class UserInfo {
    constructor(name, description){
        this._name = document.querySelector(name);
        this._description = document.querySelector(description);
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
}