export class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResult(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.statusText}`);
  }

  getUserInfo = () => {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((result) => {
      return this._checkResult(result);
    });
  };

  patchUserInfo = (name, about) => {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((result) => {
      return this._checkResult(result);
    });
  };

  getCards = () => {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((result) => {
      return this._checkResult(result);
    });
  };

  postCard = (name, link) => {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((result) => {
      return this._checkResult(result);
    });
  };

  likeCard = (cardId, isLiked) => {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    }).then((result) => {
      return this._checkResult(result);
    });
  };

  /*dislikeCard = (cardId) => {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((result) => {
      if (result.ok) {
        return this._checkResult(result);
      }
    });
  };*/

  deleteCard = (cardId) => {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((result) => {
      return this._checkResult(result);
    });
  };

  editAvatar = (avatar) => {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((result) => {
      return this._checkResult(result);
    });
  };

  /*getAllInfo() {
    return Promise.all([this.getCards(), this.getUserInfo()]);
  }*/
}

//Api
const api = new Api({
  url: 'http://api.mesto-avtor-Hohlov-Al.nomoredomains.club',
  headers: {
    'Content-type': 'application/json',
    authorization: '248d9d772294224ebe193d860b7b9cd260a87da2bca19154d6a67e2c94214b6e',
  },
});

export default api;

/*
const api = new Api({
  url: 'http://api.mesto-avtor-Hohlov-Al.nomoredomains.club',
  headers: {
    'Content-type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
    'Content-type': 'application/json',
    authorization: '93622233-6815-45c6-a1af-b3fd0330c20e',
  },
});

*/
