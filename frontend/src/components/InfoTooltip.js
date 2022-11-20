import React from 'react';
import imageSuccess from '../images/imageSuccess.svg';
import imageError from '../images/imageError.svg';

function InfoTooltip({ isOpen, onClose, authStatus }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <fieldset className="popup__container popup__container_type_info-tooltip">
        <button className="popup__close-button" type="button" onClick={onClose} />
        <img
          className="popup__tooltip-image"
          src={authStatus ? imageSuccess : imageError}
          alt={authStatus ? 'Успех' : 'Ошибка'}
        />
        <p className="popup__tooltip-text">
          {authStatus
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте еще раз.'}
        </p>
      </fieldset>
    </div>
  );
}

export default InfoTooltip;
