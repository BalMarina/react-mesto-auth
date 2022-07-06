import React from 'react';
import '../index.css';
import api from '../utils/api';
import Card from './Card';

function Main(props) {

  const [userName, setUserName] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([
      api.getUser(),
      api.getCards()
    ])
      .then((data) => {
        setUserName(data[0].name)
        setUserDescription(data[0].about)
        setUserAvatar(data[0].avatar)
        setCards(data[1])
      })
  }, [])

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
            src={userAvatar}
            alt="Аватар профиля"
          />
        </div>
        <div className="profile__edit-container">
          <div className="profile__text">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">{userName}</h1>
              <button
                onClick={props.onEditProfile}
                aria-label="Редактировать профиль"
                className="profile__edit-button"
                type="button"
              />
            </div>
            <p className="profile__description">{userDescription}</p>
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
        {cards.map((card) => <Card key={card._id} card={card} onCardClick={props.onCardClick} />)}
      </section>
    </main>
  );
}

export default Main;
