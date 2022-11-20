import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_preview ${card.name ? 'popup_opened' : ''}`}>
      <div className="popup__container-preview">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <img className="popup__preview" src={card.link} alt={card.name} />
        <p className="popup__subtitle">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
