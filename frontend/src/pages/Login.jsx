import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import eye from "../assets/Icons/Eye_Icon.svg";
import logo from "../assets/Logo_Innovin.svg";

// messages d'erreurs et inputs rouge en cas d'échec de l'authentification
// controller les entrées via regex ou autres méthodes

function Login({ setUser }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isHidden, setIsHidden] = useState(true);

  const navigate = useNavigate();

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

    const userData = {
      email: form.email,
      password: form.password,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, userData)
      .then((res) => {
        if (res.data.token) {
          setUser(res.data.token);
          navigate("/Tasting_Presentation");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="login">
      <div className="loginContentDiv">
        <div>
          {" "}
          <img src={logo} alt="Inovin logo" className="logo" />
          <p className="logoText" />
        </div>

        <form action="" className="loginForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="loginEmailLabel">
              Email
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
              Password
              <div className="passwordInput">
                <input
                  type={isHidden ? "password" : "text"}
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
                  <img src={eye} alt="eye icon to show password" />
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

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Login;
