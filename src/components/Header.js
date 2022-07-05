import '../index.css';
import logo from '../images/logo.svg'

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип"
      />
    </header>

  );
}

// ReactDOM.render((

// ), document.querySelector())

export default Header;
