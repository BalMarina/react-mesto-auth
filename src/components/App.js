// В работе использовалась React Router v6

import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
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
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const [isInfoTooltip, setInfoTooltip] = React.useState({ isOpen: false, successful: false });

  // const history = React.useNavigate()
  let navigate = useNavigate();

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          setEmail(res.data.email)
          setLoggedIn(true)
        }
      })
    }
  }

  React.useEffect(() => {
    tokenCheck()
  }, [])

  React.useEffect(() => {
    if (loggedIn === true) {
      navigate('/')
    }
  }, [loggedIn])

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
        // handleLogged()
        setCards(data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  function handleLogged() {
    setLoggedIn(true)
  }

  // useEffect(() => {
  //   console.log(loggedIn)
  // }, [loggedIn])

  function handleRegister(password, email) {
    auth.register(password, email)
      .then(data => {
        handleInfoTooltip({ successful: true });
        navigate('/sign-in')
        //  history('/sign-in');
      })
      .catch(err => {
        console.log(err);
        handleInfoTooltip({ successful: false });
      })
  }

  function handleLogin(password, email) {
    auth.login(password, email)
      .then(res => {
        const { token } = res;
        localStorage.setItem('jwt', token)
        setEmail(email);
        handleLogged();
        //  handleInfoTooltip({ isOpen: true, successful: true });
        // history('/');
      })
      .catch(err => {
        //  handleInfoTooltip({ isOpen: true, successful: false });
        console.log(err);
        handleInfoTooltip({ successful: false });
      })
  }

  function handleInfoTooltip(result) {
    setInfoTooltip({
      ...isInfoTooltip, isOpen: true, successful: result
    });
  }

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
    setInfoTooltip(false)
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

  function handleSignOut() {
    localStorage.removeItem('jwt')
    setEmail('');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className={"page"}>
        <Header
          email={email}
          loggedIn={loggedIn}
          onSignOut={handleSignOut} />
        <Routes>
          <Route
            path='/'
            element={<ProtectedRoute
              loggedIn={loggedIn}
              component={Main}
              onCardClick={handleCardClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              path="/" />
            }
          />
          <Route path='/sign-in' element={loggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path='/sign-up' element={<Register onRegister={handleRegister} />} />
          {/* <Route exact path='/' element={loggedIn
              ? <Navigate to="/" />
              : <Navigate to="/sign-in" />}
            /> */}
        </Routes>

        {/* <Footer /> */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip result={isInfoTooltip} onClose={closeAllPopups} />
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
