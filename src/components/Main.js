import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  // const [cards, setCards] = React.useState([])
  const { currentUser } = React.useContext(CurrentUserContext)

  // React.useEffect(() => {
  //   Promise.all([
  //     api.getUser(),

  //   ])
  //     .then((data) => {
  //       setName(data[0].name)
  //       setDescription(data[0].about)
  //       setAvatar(data[0].avatar)
  //       setCards(data[1])
  //     })
  // }, [])

  // React.useEffect(() => {
  //   api.getCards()
  //     .then((data) => {
  //       setCards(data)
  //     })
  // }, [])

  // function handleCardLike(card) {
  //   const isLiked = card.likes.some(i => i._id === currentUser._id);

  //   api.changeLikeCardStatus(card._id, !isLiked)
  //     .then((likedCard) => {
  //       setCards((state) =>
  //         state.map((c) => c._id === card._id ? likedCard : c));
  //     });
  // }

  // function handleCardDelete(card) {
  //   api.deleteCard(card._id)
  //     .then(() => {
  //       setCards((state) =>
  //         state.filter((c) => c._id !== card._id));
  //     });
  // }

  return (
    <main>
      <section className="profile">
        <div className="profile__changing-avatar">
          <button
            onClick={props.onEditAvatar}
            aria-label="Редактировать аватар"
            className="profile__avatar-button"
            type="button"
          />
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар профиля"
          />
        </div>
        <div className="profile__edit-container">
          <div className="profile__text">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={props.onEditProfile}
                aria-label="Редактировать профиль"
                className="profile__edit-button"
                type="button"
              />
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          aria-label="Добавить"
          className="profile__add-button"
          type="button"
        />
      </section>
      <section className="elements">
        {props.cards.map((card) => <Card
          key={card._id}
          card={card}
          onCardClick={props.onCardClick}
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete}
        />)}
      </section>
    </main>
  );
}

export default Main;
