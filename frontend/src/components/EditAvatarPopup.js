import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const avatarInputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      avatar: avatarInputRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarInputRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name="popup__form_avatar"
      title="Обновить аватар"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
    >
      <input
        type="url"
        placeholder="Ссылка на автар"
        className="popup__input popup__input_type_avatar"
        name="avatar-input"
        id="avatar-input"
        ref={avatarInputRef}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
