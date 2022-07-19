import React from 'react';

import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import api from '../utils/api';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({})

  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getCards()
      .then((data) => {
        setCards(data)
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((likedCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? likedCard : c));
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => c._id !== card._id));
      });
  }

  React.useEffect(() => {
    api.getUser()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

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
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setSelectedCard(null)
  }

  function handleUpdateUser(userData) {
    api.addUser(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(avatar) {
    api.changeAvatar({ avatar })
      .then((data) => {
        setCurrentUser({ ...currentUser, avatar: data.avatar });
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleAddNewPlace(card) {
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }


  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className={"page"}>
        <Header />
        <Main
          onCardClick={handleCardClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddNewPlace={handleAddNewPlace} />
        {/* <PopupWithForm
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
          } /> */}

        {/* <PopupWithForm
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
          } /> */}
        {/* <PopupWithForm
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
          } /> */}
        <PopupWithForm
          name={'confirm'}
          title={'Вы уверены?'}
          buttonText={"Да"}
          children={
            <fieldset className="popup__content">
            </fieldset>
          } />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
