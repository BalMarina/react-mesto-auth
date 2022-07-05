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

// ReactDOM.render((

// ), document.querySelector())

/* <div className="popup popup-profile">
         <div className="popup__container">
           <form name="profile-form" className="popup__form" noValidate="">
             <button className="popup__close-icon" type="button" />
             <h2 className="popup__head">Редактировать профиль</h2>
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
               <button
                 aria-label="Сохранить"
                 className="popup__submit"
                 type="submit"
                 disabled=""
               >
                 Сохранить
               </button>
             </fieldset>
           </form>
         </div>
       </div>
       <div className="popup popup-card">
         <div className="popup__container">
           <form name="card-form" className="popup__form" noValidate="">
             <button className="popup__close-icon" type="button" />
             <h2 className="popup__head">Новое место</h2>
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
               <button
                 aria-label="Создать"
                 className="popup__submit"
                 type="submit"
                 disabled=""
               >
                 Создать
               </button>
             </fieldset>
           </form>
         </div>
       </div>
       <div className="popup popup-pic">
         <div className="popup__container popup-pic__content">
           <button className="popup__close-icon" type="button" />
           <img className="popup-pic__photo" alt="" />
           <span className="popup-pic__alt" />
         </div>
       </div>
       <div className="popup popup-avatar">
         <div className="popup__container">
           <form name="avatar-form" className="popup__form" noValidate="">
             <button className="popup__close-icon" type="button" />
             <h2 className="popup__head">Обновить аватар</h2>
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
               <button
                 aria-label="Сохранить"
                 className="popup__submit"
                 type="submit"
                 disabled=""
               >
                 Сохранить
               </button>
             </fieldset>
           </form>
         </div>
       </div>
       <div className="popup popup-confirm">
         <div className="popup__container">
           <form name="confirm-form" className="popup__form" noValidate="">
             <button className="popup__close-icon" type="button" />
             <h2 className="popup__head">Вы уверены?</h2>
             <fieldset className="popup__content">
               <button aria-label="Да" className="popup__submit" type="submit">
                 Да
               </button>
             </fieldset>
           </form>
         </div>
       </div>
     </>*/


export default App;
