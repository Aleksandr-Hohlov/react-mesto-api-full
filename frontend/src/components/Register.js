import React from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegister, isDataSet }) {
  const [data, setData] = React.useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = data;
    handleRegister({ email, password });
    console.log('handleSubmit');
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2 className="login__title">Регистрация</h2>
      <input
        className="login__input login__input_email"
        type="email"
        placeholder="Email"
        id="email"
        name="email"
        onChange={handleChange}
        value={data.email}
      ></input>
      <input
        className="login__input login__input_password"
        type="password"
        placeholder="Пароль"
        id="password"
        name="password"
        onChange={handleChange}
        value={data.password}
      ></input>
      <button className="login__submit-button" type="submit">
        Зарегистрироваться
      </button>
      <Link to="/sign-in" className="login__link-enter">
        Уже зарегистрированы? Войти
      </Link>
    </form>
  );
}

export default Register;
