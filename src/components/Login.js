import React from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import '../index.css';

function Login(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    function handleEmail(e) {
        setEmail(e.target.value)
    }

    function handlePasword(e) {
        setPassword(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (!password || !email) {
            return;
        }
        props.onLogin(password, email);
    }

    return (
        <div className="auth">
            <p className="auth__head">
                Вход
            </p>
            <form onSubmit={handleSubmit} className="auth__form">
                {/* <label htmlFor="email">
                    Логин:
                </label> */}
                <input placeholder='Email' className="auth__input" required id="email" name="email" type="text" value={email} onChange={handleEmail} />
                {/* <label htmlFor="password">
                    Пароль:
                </label> */}
                <input placeholder='Пароль:' className="auth__input" required id="password" name="password" type="password" value={password} onChange={handlePasword} />
                <button className="auth__submit" type="submit" onSubmit={handleSubmit}>Войти</button>
            </form>

            {/* <div className="login__signup">
                <p>Ещё не зарегистрированы?</p>
                <Link to="/register" className="signup__link">Зарегистрироваться</Link>
            </div> */}
        </div>
    )
}

export default Login;