import '../index.css';

function PopupWithForm(props) {
  return (
    <div className="page">
      <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className={"popup__container"}>
          <form
            name={`${props.name}-form`}
            className={"popup__form"}
            noValidate="">
            <button
              className={"popup__close-icon"}
              type="button"
              onClick={props.onClose} />
            <h2 className={"popup__head"}>{props.title}</h2>
            <>{props.children}</>
            <button
              className={"popup__submit"}
              type="submit"
              disabled
            >{props.buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


{/* <fieldset className="popup__content">
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
          />
          Создать
        </fieldset>

        <div className="popup popup-pic">
          <div className="popup__container popup-pic__content">
            <button className="popup__close-icon" type="button" />
            <img className="popup-pic__photo" alt="" />
            <span className="popup-pic__alt" />
          </div>
        </div>


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
          >
            Сохранить
          </button>
        </fieldset>

        <fieldset className="popup__content">
          <button aria-label="Да" className="popup__submit" type="submit">
            Да
          </button>
        </fieldset>
      </>

    </div>
 

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
  />
  Сохранить
</fieldset> */}

// ReactDOM.render((

// ), document.querySelector())

export default PopupWithForm;
