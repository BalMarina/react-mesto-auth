import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import '../index.css';

function Register(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    function handleEmail(e) {
        setEmail(e.target.value)
    }

    function handlePasword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!password || !email) {
            return;
        }
        props.onRegister(password, email);
    }

    return (
        <div className="auth">
            <p className="auth__head">
                Регистрация
            </p>
            <form onSubmit={handleSubmit} className="auth__form">
                {/* <label htmlFor="email">
                    Логин:
                </label> */}
                <input placeholder='Логин' className="auth__input" required id="email" name="email" type="text" value={email} onChange={handleEmail} />
                {/* <label htmlFor="password">
                    Пароль:
                </label> */}
                <input placeholder='Пароль' className="auth__input" required id="password" name="password" type="password" value={password} onChange={handlePasword} />
                <button className="auth__submit" type="submit" onSubmit={handleSubmit}>Зарегистрироваться</button>
            </form>

            <div className="auth__redirection-text">
                <p>Уже зарегистрированы? Войти</p>
                <Link to="/register" className="auth__redirection-text_link">Войти</Link>
            </div>
        </div>
    )
}

export default Register;