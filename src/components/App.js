import React from 'react';

import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen()
    setEditProfilePopupOpen()
    setAddPlacePopupOpen()
    setSelectedCard()
  }

  return (
    <div className={"page"}>
      <Header />
      <Main
        onCardClick={handleCardClick}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick} />
      <Footer />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm
        name={'profile'}
        title={'Редактировать профиль'}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText={"Сохранить"}
        children={
          <fieldset className="popup__content">
            <input
              required=""
              type="text"
              className="popup__text popup__input"
              defaultValue=""
              id="popup-name"
              name="popup-name"
              placeholder="Имя"
              minLength={2}
              maxLength={30}
              autoComplete="off"
            />
            <span className="popup__error" id="popup-name_type_error" />
            <input
              required=""
              type="text"
              className="popup__text popup__input"
              defaultValue=""
              id="popup-job"
              name="popup-job"
              placeholder="О себе"
              minLength={2}
              maxLength={200}
              autoComplete="off"
            />
            <span className="popup__error" id="popup-job_type_error" />
          </fieldset>
        } />

      <PopupWithForm
        name={'card'}
        title={'Новое место'}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText={"Создать"}
        children={
          <fieldset className="popup__content">
            <input
              required=""
              type="text"
              className="popup__text popup__input"
              defaultValue=""
              id="card-name"
              name="name"
              placeholder="Название"
              minLength={2}
              maxLength={30}
              autoComplete="off"
            />
            <span className="popup__error" id="card-name_type_error" />
            <input
              required=""
              type="url"
              className="popup__text popup__input"
              defaultValue=""
              id="card-pic"
              name="pic"
              placeholder="Ссылка на картинку"
            />
            <span className="popup__error" id="card-pic_type_error" />
          </fieldset>
        } />
      <PopupWithForm
        name={'avatar'}
        title={'Обновить аватар'}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText={"Обновить"}
        children={
          <fieldset className="popup__content">
            <input
              required=""
              type="url"
              className="popup__text popup__input"
              defaultValue=""
              id="avatar"
              name="avatar"
              placeholder="Ссылка на картинку"
            />
            <span className="popup__error" id="avatar_type_error" />
          </fieldset>
        } />
      <PopupWithForm
        name={'confirm'}
        title={'Вы уверены?'}
        buttonText={"Да"}
        children={
          <fieldset className="popup__content">
          </fieldset>
        } />
    </div>
  );
}

export default App;
