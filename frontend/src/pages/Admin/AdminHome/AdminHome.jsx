import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AdminDashboard from "../../../components/Admin_Dashboard/Admin_Dashboard";
import "./AdminHome.scss";
import AuthContext from "../../../contexts/AuthContext";
import AdminContext from "../../../contexts/AdminContext";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ModalValidation from "../../../components/ModalValidation/ModalValidation";

function AdminHome() {
  const { userToken } = useContext(AuthContext);
  const { refactorDate, setIdToUpdate } = useContext(AdminContext);
  const [upcomingWorkshops, setUpcomingWorkshops] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/nextworkshops`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setUpcomingWorkshops(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    userToken &&
    isLoaded && (
      <div className="adminHome">
        <AdminDashboard />
        <div className="homeContent">
          <h1>Accueil administrateur</h1>
          <div className="welcomeAdmin">
            <p>Bienvenue sur votre espace administrateur.</p>
            <p>Ici, vous pouvez créer, modifier, supprimer divers éléments.</p>
          </div>
          <hr />
          <div className="launchWorkshop">
            <h2>Prochain Atelier</h2>
            <div className="launchContent">
              <p>Atelier N° {upcomingWorkshops[0].id}</p>{" "}
              <i className="fi fi-sr-bullet" />
              <p className="dateText">
                {refactorDate(upcomingWorkshops[0].datetime).split(" ")[0]}{" "}
                <span>
                  - {refactorDate(upcomingWorkshops[0].datetime).split(" ")[1]}
                </span>
              </p>
              <i className="fi fi-sr-bullet" />
              <p>{upcomingWorkshops[0].place}</p>
            </div>
            <div className="buttons">
              <ButtonPrimary
                className="launchButton"
                type="button"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Démarrer
              </ButtonPrimary>

              <ButtonPrimary
                className="editButton"
                type="button"
                onClick={() => {
                  setIdToUpdate(upcomingWorkshops[0].id);
                  navigate("/admin/workshops/edit");
                }}
              >
                <i className="fi fi-rr-edit" />
              </ButtonPrimary>
            </div>
          </div>
          <hr />
          <div className="nextTastings">
            <h2>Prochaines Dégustations</h2>
            <div className="tableSection">
              {" "}
              <table className="table">
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Lieu</th>
                    <th>Participants</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingWorkshops.map((workshop) => (
                    <tr key={workshop.id}>
                      <td>
                        <p>{workshop.id}</p>
                      </td>
                      <td>{refactorDate(workshop.datetime)}</td>
                      {workshop.wine_type.toLowerCase() === "rouge" ? (
                        <td>
                          <div className="redWine" />
                        </td>
                      ) : (
                        <td>
                          <div className="whiteWine" />
                        </td>
                      )}
                      <td>{workshop.place}</td>

                      <td>{workshop.attendees}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="seeMore">
              <ButtonPrimary
                className="seeMoreButton"
                type="button"
                onClick={() => {
                  navigate("/admin/workshops");
                }}
              >
                Voir plus
              </ButtonPrimary>
            </div>
          </div>
        </div>
        <ModalValidation
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          question={`Confirmer le lancement de l'atelier N° ${upcomingWorkshops[0].id} ?`}
          firstButton="Confirmer"
          secondButton="Annuler"
          actionFunction={() => {}}
          functionParam={upcomingWorkshops[0].id}
        />
        {isModalOpen && (
          <div
            className="modalBg"
            onClick={() => {
              setIsModalOpen(false);
            }}
            aria-hidden="true"
          />
        )}
      </div>
    )
  );
}

export default AdminHome;
