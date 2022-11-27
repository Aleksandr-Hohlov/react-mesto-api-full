import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ /*name, link, likes,*/ onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = cards.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__delete ${isOwn ? '' : 'element__delete_disabled'}`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = cards.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

  function handleClick() {
    onCardClick(cards);
  }

  function handleLikeClick() {
    onCardLike(cards);
  }

  function handleDeleteClick() {
    onCardDelete(cards);
  }

  return (
    <article className="element">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <img className="element__image" alt={cards.name} src={cards.link} onClick={handleClick} />
      <div className="element__caption">
        <h2 className="element__name">{cards.name}</h2>
        <div className="element__like-counter-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-counter">{cards.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
