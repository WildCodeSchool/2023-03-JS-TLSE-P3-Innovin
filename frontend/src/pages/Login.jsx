import { useState } from "react";

function Login() {
  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const handleNameChange = (event) => {
  //     setName(event.target.value);
  //   };

  //   const handleEmailChange = (event) => {
  //     setEmail(event.target.value);
  //   };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isHidden, setIsHidden] = useState(true);

  const handleEmailChange = (event) => {
    setForm({
      ...form,
      email: event.target.value,
    });
  };

  const handlePasswordChange = (event) => {
    setForm({
      ...form,
      password: event.target.value,
    });
  };

  const handlehidePassword = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setForm({
      name: "",
      email: "",
    });
  };

  return (
    <div className="login">
      <div className="loginContentDiv">
        <div>
          {" "}
          <img
            src="./assets/Logo_Innovin.svg"
            alt="Inovin logo"
            className="logo"
          />
          <p className="logoText" />
        </div>

        <form action="" className="loginForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="loginEmailLabel">
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                autoComplete="email"
                onChange={handleEmailChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password" className="loginPasswordLabel">
              <div className="passwordInput">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  autoComplete="current-password"
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  onClick={handlehidePassword}
                  className="hidePasswordButton"
                >
                  <img src="./assets/eye.svg" alt="eye icon to show password" />
                </button>
              </div>
            </label>
          </div>
          <button className="loginButton" type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
