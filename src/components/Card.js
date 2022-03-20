export class Card {
  constructor(name, link, likes, id, userId, ownerId, templateSelector,
    { handleCardClick, deleteIcon, handleLike }) {
    this._name = name;
    this._link = link;
    this._like = likes;
    this._id = id;
    this._userId = userId;
    this._ownerId = ownerId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._deleteIcon = deleteIcon;
    this._handleLike = handleLike;
  }

  _getTemplate() {
    const photoTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photo__item')
      .cloneNode(true);

    return photoTemplate;
  }

  isLiked() {
    const userLikedCard = this._like.find(user => user._id === this._userId);
    return userLikedCard;
  }

  setLikes(newLikes) {
    this._like = newLikes;
    this._likeCount = this._element.querySelector('.photo__like-count');
    this._likeCount.textContent = this._like.length;

    if (this.isLiked()) {
      this._addLike();
    }
    else {
      this._removeLike();
    }
  }

  createCard() {
    this._element = this._getTemplate();
    this._img = this._element.querySelector('.photo__mesto');
    this._description = this._element.querySelector('.photo__description');
    this._likeButton = this._element.querySelector('.photo__like');
    this._deleteButton = this._element.querySelector('.photo__delete');
    this._img.src = this._link;
    this._img.alt = this._name;
    this._description.textContent = this._name;

    this._setEventListeners();
    this.setLikes(this._like);


    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none'
    }

    return this._element;
  }

  deletePhotoHandler() {
    this._element.remove();
    this._element = null;
  };

  _addLike() {
    this._likeButton.classList.add('photo__like_active');
  }
  _removeLike() {
    this._likeButton.classList.remove('photo__like_active');
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this._deleteIcon(this._id));
    this._likeButton.addEventListener('click', () => this._handleLike(this._id));
    this._img.addEventListener('click', this._handleCardClick);
  }

}

