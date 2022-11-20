import React from 'react';

function PopupWithForm({ isOpen, onClose, name, title, buttonText, children, onSubmit }) {
  return (
    <div className={`popup ${name} ${isOpen ? 'popup_opened' : ''}`}>
      <form name={`${name}`} className="popup__container" onSubmit={onSubmit}>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <h2 className="popup__title">{`${title}`}</h2>
        {children}
        <button
          type="submit"
          className="popup__save-button"
          title={`${buttonText}`}
        >{`${buttonText}`}</button>
      </form>
    </div>
  );
}

export default PopupWithForm;
