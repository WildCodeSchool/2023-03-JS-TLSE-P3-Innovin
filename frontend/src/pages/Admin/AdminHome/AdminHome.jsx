import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AdminDashboard from "../../../components/Admin_Dashboard/Admin_Dashboard";
import "./AdminHome.scss";
import AuthContext from "../../../contexts/AuthContext";
import AdminContext from "../../../contexts/AdminContext";

function AdminHome() {
  const { userToken } = useContext(AuthContext);
  const { refactorDate } = useContext(AdminContext);
  const [upcomingWorkshops, setUpcomingWorkshops] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/nextworkshops`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setUpcomingWorkshops(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="adminHome">
      <AdminDashboard />
      <div className="homeContent">
        <h1>Accueil administrateur</h1>
        <div className="welcomeAdmin">
          <p>Bienvenue sur votre espace administrateur.</p>
          <p>Ici, vous pouvez créer, modifier, supprimer divers éléments.</p>
        </div>
        <div className="nextTastings">
          <h2>Prochaines Dégustations</h2>
          <div className="tableSection">
            {" "}
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Lieu</th>
                  <th>Commentaire</th>
                  <th>Participants</th>
                </tr>
              </thead>
              <tbody>
                {upcomingWorkshops.map((workshop) => (
                  <tr key={workshop.id}>
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
                    <td>
                      <p className="commentary">{workshop.commentary}</p>
                    </td>
                    <td>{workshop.attendees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
