import React, { useState } from "react";
import css from "./login.less";

const Login = ({ login, error }) => {
  const [username, setUsername] = useState("admin@danielogmarie.no");
  const [password, setPassword] = useState("");

  return (
    <form className={css.loginContainer}>
      <h2 className={css.header}>Logg inn</h2>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        className={css.inputField}
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        className={css.inputField}
        type="password"
      />
      <button
        type="button"
        onClick={() => login(username, password)}
        disabled={username.length === 0 || password.length === 0}
        className={css.loginButton}
      >
        Logg inn
      </button>
      {error && <div className={css.error}>{error}</div>}
    </form>
  );
};

export default Login;
