import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";
import eye from "../../assets/Icons/Eye_Icon.svg";
import logo from "../../assets/Logo_W_Circles.svg";
import line from "../../assets/Line.svg";
import ButtonPrimary from "../../components/ButtonPrimary";
import Input from "../../components/Input";
import AuthContext from "../../contexts/AuthContext";
import TastingNoteContext from "../../contexts/TastingNoteContext";

function Login() {
  const { setToken, setUser } = useContext(AuthContext);
  const { tastingNote, setTastingNote } = useContext(TastingNoteContext);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // ----------------------------------------handlers to control the input fields----------------------------------------------------
  const handleEmailChange = (event) => {
    setForm({
      ...form,
      email: event.target.value,
    });
    setErrorMsg(false);
  };

  const handlePasswordChange = (event) => {
    setForm({
      ...form,
      password: event.target.value,
    });
    setErrorMsg(false);
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
          console.info(loggedInUser);
          setTastingNote({ ...tastingNote, idUser: loggedInUser.id });
        }
      })
      .catch((err) => {
        console.error(err.message);
        setErrorMsg(true);
      });
  };

  // ------------------------------------------------return the component----------------------------------------------------
  return (
    <div className="login">
      <div className="loginContentDiv">
        <div className="logoDiv">
          {" "}
          <img src={logo} alt="Inovin logo" className="logoLogin" />
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
            <p>Mot de passe</p>
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
          <ButtonPrimary
            disabled={errorMsg}
            className="loginButton"
            type="submit"
          >
            Se connecter
          </ButtonPrimary>
          {errorMsg && <p className="error">Email ou mot de passe incorrect</p>}
        </form>
        <div className="split">
          <img src={line} alt="split line" className="splitLine" />
          <p>ou</p>
          <img src={line} alt="split line" className="splitLine" />
        </div>
        <div className="noAccount">
          <p>Pas encore en possession d'un compte ?</p>

          <button
            type="button"
            className="registerLink"
            onClick={() => navigate("/registration")}
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
