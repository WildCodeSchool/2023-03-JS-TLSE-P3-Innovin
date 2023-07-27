import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import "./Registration.scss";
import eye from "../../assets/Icons/Eye_Icon.svg";
import logo from "../../assets/Logo_W_Circles.svg";
import Linetxtregistration from "../../assets/Linetxtregistration.svg";
import ButtonPrimary from "../../components/ButtonPrimary";
import Input from "../../components/Input";

function Registration() {
  const [form, setForm] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    wine_color: "",
    preference_description: "",
  });
  const [isHidden, setIsHidden] = useState(true);
  const [taste, setTaste] = useState(null);
  const navigate = useNavigate();
  const [isFormIncomplete, setIsFormIncomplete] = useState(false);

  // ----------------------------------------Dropdown table-------------------------------------------------------------------------
  const tastes = [
    { name: "Rouge" },
    { name: "Blanc" },
    { name: "Rouge et blanc" },
  ];

  // ----------------------------------------Handlers to control the input fields----------------------------------------------------

  const handleLastNameChange = (event) => {
    setForm({
      ...form,
      lastname: event.target.value,
    });
  };
  const handleFirstNameChange = (event) => {
    setForm({
      ...form,
      firstname: event.target.value,
    });
  };
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

  const handleTasteChange = (event) => {
    setTaste(event.value);
    setForm({
      ...form,
      wine_color: event.target.value.name,
    });
  };
  const handleDetailsChange = (event) => {
    setForm({
      ...form,
      preference_description: event.target.value,
    });
  };

  // ------------------------------------------Function to hide or show password----------------------------------------------------
  const handlehidePassword = () => {
    setIsHidden(!isHidden);
  };

  // --------------------------------Handler to submit the form and register the user-------------------------------------------

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.lastname && form.firstname && form.email && form.password) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/users`, form)
        .then((res) => {
          if (res.status === 201) {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      setIsFormIncomplete(true);
    }
  };

  // ------------------------------------------------Return the component----------------------------------------------------
  return (
    <div className="registration">
      <section className="registrationContentDiv">
        <div className="logoDiv">
          <img src={logo} alt="Inovin logo" className="logo" />
          <p className="logoText">Inovin</p>
        </div>

        <form className="registrationForm" onSubmit={handleSubmit}>
          <div>
            <p>Nom *</p>
            <label htmlFor="lastname" className="registrationLastNameLabel">
              <Input
                placeholder="Enter your lastname"
                lastname="lastname"
                id="lastname"
                value={form.lastname}
                autoComplete="lastname"
                onChange={handleLastNameChange}
              />
            </label>
          </div>
          <div>
            <p>Prénom *</p>
            <label htmlFor="firstname" className="registrationFirstNameLabel">
              <Input
                placeholder="Enter your firstname"
                name="firstname"
                id="firstname"
                value={form.firstname}
                autoComplete="firstname"
                onChange={handleFirstNameChange}
              />
            </label>
          </div>
          <div>
            <p>Email *</p>
            <label htmlFor="email" className="registrationEmailLabel">
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
            <p>Mot de passe *</p>
            <label htmlFor="password" className="registrationPasswordLabel">
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
          <div className="tasteDropdown">
            <p>Goûts *</p>
            <Dropdown
              value={taste}
              onChange={handleTasteChange}
              options={tastes}
              optionLabel="name"
              placeholder="Tastes"
            />
          </div>
          <div className="details_container">
            <p>Détails</p>
            <InputTextarea
              name="details"
              placeholder="Describe your taste"
              autoResize
              value={form.details}
              id="details"
              onChange={handleDetailsChange}
              rows={5}
              cols={30}
            />
          </div>
          <ButtonPrimary className="registrationButton" type="submit">
            Inscription
          </ButtonPrimary>
        </form>
        <div className="Registrationdivtxt">
          {isFormIncomplete && (
            <span id="Incorrect_registration">
              Remplissez les champs obligatoires.
            </span>
          )}
          <div className="RegistrationContainertxtou">
            <img src={Linetxtregistration} alt="line-left" />
            <span className="Registrationtxtou">
              ou
              <br />
            </span>
            <img src={Linetxtregistration} alt="line-right" />
          </div>

          <p>Déjà en possession d'un compte ?</p>
          <Link to="/login" className="Registrationlinktologin">
            Je me connecte
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Registration;
