import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AdminContext from "../../../contexts/AdminContext";
import AuthContext from "../../../contexts/AuthContext";
import "./UsersModification.scss";
import AdminDashboard from "../../../components/Admin_Dashboard/Admin_Dashboard";
import Input from "../../../components/Input";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ToggleButton from "../../../components/ToggleButton/ToggleButton";
import ModalValidation from "../../../components/ModalValidation/ModalValidation";

function UsersModification() {
  const { userIdToUpdate, dateToPost } = useContext(AdminContext);
  const { userToken } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const onToggle = () => {
    if (userToUpdate.admin_credentials === 0) {
      setUserToUpdate({
        ...userToUpdate,
        admin_credentials: 1,
      });
    } else {
      setUserToUpdate({
        ...userToUpdate,
        admin_credentials: 0,
      });
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${userIdToUpdate}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setUserToUpdate(response.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userIdToUpdate]);

  const handleChange = (event, key) => {
    setUserToUpdate({
      ...userToUpdate,
      [key]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { id, ...formData } = userToUpdate;
    const form = { ...formData, birth_date: dateToPost(formData.birth_date) };

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userIdToUpdate}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        console.info(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    isLoaded &&
    userToken && (
      <div className="userModification">
        <button
          className="backButton"
          type="button"
          onClick={() => navigate("/admin/users")}
        >
          <i className="fi fi-rr-undo" />
        </button>
        <AdminDashboard />
        <div className="globalModifContainer">
          <div className="modifContent">
            <h1>Utilisateur N° {userToUpdate.id}</h1>
            <form action="" onSubmit={handleSubmit}>
              <div className="name">
                <div className="lastname">
                  <p className="textLabel">Nom</p>
                  <label htmlFor="lastname" className="nameLabel">
                    <Input
                      type="text"
                      name="lastname"
                      id="lastname"
                      autoComplete="text"
                      value={userToUpdate.lastname}
                      onChange={(e) => handleChange(e, "lastname")}
                    />
                  </label>
                </div>
                <div className="firstname">
                  <p className="textLabel">Prénom</p>
                  <label htmlFor="firstname" className="dateLabel">
                    <Input
                      type="firstname"
                      name="firstname"
                      id="firstname"
                      value={userToUpdate.firstname}
                      autoComplete="firstname"
                      onChange={(e) => handleChange(e, "firstname")}
                    />
                  </label>
                </div>
              </div>
              <div className="email">
                <p className="textLabel">Lieu</p>
                <label htmlFor="email" className="emailLabel">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={userToUpdate.email}
                    autoComplete="email"
                    onChange={(e) => handleChange(e, "email")}
                  />
                </label>
              </div>
              <div className="credentials">
                <p>Droits Administrateur</p>
                <ToggleButton
                  rounded
                  isToggled={Boolean(userToUpdate.admin_credentials)}
                  onToggle={() => setIsOpen(true)}
                />
              </div>

              <ModalValidation
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                question={`${
                  userToUpdate.admin_credentials === 1
                    ? "souhaitez-vous retirer les droits administrateur à cet utilisateur ?"
                    : "souhaitez-vous donner les droits administrateur de cet utilisateur ?"
                }`}
                firstButton="Oui"
                secondButton="Non"
                actionFunction={onToggle}
              />

              <ButtonPrimary type="submit">Modifier</ButtonPrimary>
            </form>
          </div>
          {isOpen && (
            <div
              className="modalBg"
              onClick={() => {
                setIsOpen(false);
              }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    )
  );
}

export default UsersModification;
