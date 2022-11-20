import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  };

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonTitle="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
    >
      <input
        type="text"
        placeholder="Название"
        className="popup__input popup__input_type_name-place"
        name="popup__input_name-place"
        id="place-input"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_link-place"
        name="popup__input_link-place"
        id="link-input"
        value={link}
        onChange={handleLinkChange}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
