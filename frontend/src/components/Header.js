import React from 'react';
import logo from '../images/logo.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header({ handleLogout, email }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого" />
      <Switch>
        <Route exact path="/">
          <div className="header__info">
            <p className="header__email">{email}</p>
            <Link to="/sign-in" onClick={handleLogout} className="header__link">
              Выйти
            </Link>
          </div>
        </Route>

        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>

        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
