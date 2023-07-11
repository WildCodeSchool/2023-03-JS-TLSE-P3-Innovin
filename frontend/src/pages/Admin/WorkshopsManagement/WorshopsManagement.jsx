import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AdminDashboard from "../../../components/Admin_Dashboard/Admin_Dashboard";
import AdminContext from "../../../contexts/AdminContext";
import "./WorkshopsManagement.scss";
import SearchBar from "../../../components/SearchBar/SearchBar";
import AuthContext from "../../../contexts/AuthContext";
import ButtonPrimary from "../../../components/ButtonPrimary";

function WorkshopsManagement() {
  const { workshops, setWorkshops } = useContext(AdminContext);
  const { userToken } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState("");
  const [idToDelete, setIdToDelete] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState("asc");

  //   ----------------------------------------functions-------------------------------------------------------

  // function to get the workshops data
  useEffect(() => {
    axios
      .get("http://localhost:5000/workshop", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setWorkshops(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //   function to delete a workshop
  const onDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/workshop/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.info(res);
        setWorkshops(workshops.filter((workshop) => workshop.id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // function to sort workshops by order asc or desc
  const sortWorkshops = (col) => {
    if (order === "asc") {
      const sortedWorkshops = workshops.sort((a, b) => {
        return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
      });
      setWorkshops(sortedWorkshops);
      setOrder("desc");
    }
    if (order === "desc") {
      const sortedWorkshops = workshops.sort((a, b) => {
        return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
      });
      setWorkshops(sortedWorkshops);
      setOrder("asc");
    }
  };

  //   ---------------------------------------------------return-------------------------------------------------------
  return (
    <>
      <AdminDashboard />
      <div className="workshopsContent">
        <div className="tableHeader">
          <h1>Ateliers</h1>
          <SearchBar
            setValue={setSearchValue}
            icon="search"
            placeholder="Rechercher"
            value={searchValue}
          />
        </div>
        <div className="tableSection">
          <table className="workshopsTable">
            <thead>
              <tr>
                <th onClick={() => sortWorkshops("datetime")}>Date</th>
                <th onClick={() => sortWorkshops("wine_type")}>Type</th>
                <th onClick={() => sortWorkshops("place")}>Lieu</th>
                <th>Commentaire</th>
                <th onClick={() => sortWorkshops("attendees")}>Participants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workshops
                .filter((workshop) => {
                  const values = Object.values(workshop);
                  const filteredValues = values.some((value) =>
                    value.toString().toLowerCase().includes(searchValue)
                  );
                  return filteredValues;
                })
                .map((workshop) => {
                  const dateElement = workshop.datetime
                    .split("T")[0]
                    .split("-");
                  const date = `${dateElement[2]}/${dateElement[1]}/${dateElement[0]}`;
                  const hourElement = workshop.datetime
                    .split("T")[1]
                    .split(":");
                  const hour = `${hourElement[0]}:${hourElement[1]}`;

                  return (
                    <tr key={workshop.id}>
                      <td>{`${date} ${hour}`}</td>
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
                      <td>
                        <div className="actionButtons">
                          <button type="button" className="editBtn">
                            <i className="fi fi-rr-edit" />
                          </button>
                          <button
                            type="button"
                            className="deleteBtn"
                            onClick={() => {
                              setIsModalOpen(true);
                              setIdToDelete(workshop.id);
                            }}
                          >
                            <i className="fi fi-rr-trash" />
                          </button>
                        </div>
                      </td>{" "}
                      <div
                        className={`deleteModal ${
                          isModalOpen && idToDelete === workshop.id && "show"
                        }`}
                      >
                        <p>Êtes-vous sûr de vouloir supprimer l'atelier ?</p>
                        <div className="buttons">
                          <ButtonPrimary
                            type="button"
                            className="yesBtn"
                            onClick={() => {
                              onDelete(idToDelete);
                              setIsModalOpen(false);
                            }}
                          >
                            Supprimer
                          </ButtonPrimary>
                          <ButtonPrimary
                            type="button"
                            className="noBtn"
                            onClick={() => setIsModalOpen(false)}
                          >
                            Annuler
                          </ButtonPrimary>
                        </div>
                      </div>
                    </tr>
                  );
                })}
            </tbody>
            {isModalOpen && <div className="modalContainer" />}
          </table>
        </div>
      </div>
    </>
  );
}

export default WorkshopsManagement;
