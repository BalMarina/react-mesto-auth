import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import '../index.css';
import logo from '../images/logo.svg'

function Header(props) {

  // let location = React.useLocation()

  const [isClicked, setIsClicked] = React.useState(false);

  function handleClick() {
    setIsClicked(true)
  }

  // React.useEffect(() => {
  //   ga('send', 'pageview');
  // }, [location]);

  return (
    <header className="header">

      <img
        className="header__logo"
        src={logo}
        alt="Логотип"
      />
      <div className="header__menu">
        <p>{props.email}</p>

        <button
          onClick={() => { props.onSignOut() }}
          className={`header__link ${props.loggedIn ? 'header__link_logined' : ''}`}>Выйти</button>
      </div>
    </header>

  );
}

export default Header;
