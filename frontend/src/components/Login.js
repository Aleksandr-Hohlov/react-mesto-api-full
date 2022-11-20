import React from 'react';

function Login({ handleLogin }) {
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
    handleLogin(data);
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2 className="login__title">Вход</h2>
      <input
        className="login__input login__input_email"
        type="email"
        placeholder="Email"
        id="email"
        name="email"
        value={data.email}
        onChange={handleChange}
      ></input>
      <input
        className="login__input login__input_password"
        type="password"
        placeholder="Пароль"
        id="password"
        name="password"
        value={data.password}
        onChange={handleChange}
      ></input>
      <button className="login__submit-button" type="submit">
        Войти
      </button>
    </form>
  );
}

export default Login;
