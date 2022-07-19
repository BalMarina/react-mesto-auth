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
    api.getUser()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  React.useEffect(() => {
    api.getCards()
      .then((data) => {
        setCards(data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((likedCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? likedCard : c));
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => c._id !== card._id));
      })
      .catch(err => {
        console.log(err);
      })
  }

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
