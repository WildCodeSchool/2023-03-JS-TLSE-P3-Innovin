import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import eye from "../../assets/Icons/Eye_Icon.svg";
import logo from "../../assets/Logo_W_Circles.svg";
import ButtonPrimary from "../../components/ButtonPrimary";
import Input from "../../components/Input";
import AuthContext from "../../contexts/AuthContext";

function Login() {
  const { setToken, setUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isHidden, setIsHidden] = useState(true);

  const navigate = useNavigate();

  // ----------------------------------------handlers to control the input fields----------------------------------------------------
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

  // ------------------------------------------Function to hide or show password----------------------------------------------------
  const handlehidePassword = () => {
    setIsHidden(!isHidden);
  };

  // --------------------------------Handler to submit the form and authenticate the user-------------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, form)
      .then((res) => {
        const { token } = res.data;
        if (token) {
          setToken(token);

          const loggedInUser = res.data.user;

          if (loggedInUser.admin_credentials === 1) {
            navigate("/admin/dashboard");
          } else {
            navigate("/tasting");
          }
          setUser(loggedInUser);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // ------------------------------------------------return the component----------------------------------------------------
  return (
    <div className="login">
      <div className="loginContentDiv">
        <div className="logoDiv">
          {" "}
          <img src={logo} alt="Inovin logo" className="logo" />
          <p className="logoText">Inovin</p>
        </div>

        <form action="" className="loginForm" onSubmit={handleSubmit}>
          <div>
            <p>Email</p>
            <label htmlFor="email" className="loginEmailLabel">
              <Input
                placeholder="Enter your email"
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
            <p>Password</p>
            <label htmlFor="password" className="loginPasswordLabel">
              <div className="passwordInput">
                <Input
                  placeholder="Enter your password"
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
          <ButtonPrimary className="loginButton" type="submit">
            Se connecter
          </ButtonPrimary>
        </form>
      </div>
    </div>
  );
}

export default Login;
