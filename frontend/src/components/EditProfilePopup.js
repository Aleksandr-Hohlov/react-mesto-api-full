import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="popup__form_submit"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
    >
      <input
        type="text"
        placeholder="Введите имя"
        className="popup__input popup__input_type_job"
        name="name"
        id="name-input"
        value={name}
        onChange={onNameChange}
      />
      <input
        type="text"
        placeholder="О себе"
        className="popup__input popup__input_type_job"
        name="about"
        id="job-input"
        value={description}
        onChange={onDescriptionChange}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
