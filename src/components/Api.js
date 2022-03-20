class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers;
    }

    getProfile() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(res.status)
                }
            })
            .catch(console.log)
    }
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(res.status)
                }
            })
            .catch(console.log)
    }

    editProfile(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(res.status)
                }
            })
            .catch(console.log)
    }

    newCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(res.status)
                }
            })
            .catch(console.log)
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(res.status)
                }
            })
            .catch(console.log)
    }

    deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(res.status)
                }
            })
            .catch(console.log)
    }

    putLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(res.status)
                }
            })
            .catch(console.log)
    }

    setAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(res.status)
                }
            })
            .catch(console.log)
    }

}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
    headers: {
        authorization: '47e99e8e-ce36-4952-9670-8ff5dd570f2b',
        'Content-Type': 'application/json'
    }
}); 