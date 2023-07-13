import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AdminDashboard from "../../../components/Admin_Dashboard/Admin_Dashboard";
import AdminContext from "../../../contexts/AdminContext";
import "./WorkshopsManagement.scss";
import SearchBar from "../../../components/SearchBar/SearchBar";
import AuthContext from "../../../contexts/AuthContext";
import ButtonPrimary from "../../../components/ButtonPrimary";

function WorkshopsManagement() {
  const {
    workshops,
    setWorkshops,
    setWorkshopById,
    workshopById,
    setUsersInWorkshop,
    setWinesOnWorkshop,
    usersInWorkshop,
    winesOnWorkshop,
    refactorDate,
    setIdToUpdate,
  } = useContext(AdminContext);

  const { userToken } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState("");
  const [idToDelete, setIdToDelete] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRowClicked, setIsRowClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [order, setOrder] = useState("asc");
  const navigate = useNavigate();

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
        return a[col].toString().toLowerCase() > b[col].toString().toLowerCase()
          ? 1
          : -1;
      });
      setWorkshops(sortedWorkshops);
      setOrder("desc");
    }
    if (order === "desc") {
      const sortedWorkshops = workshops.sort((a, b) => {
        return a[col].toString().toLowerCase() < b[col].toString().toLowerCase()
          ? 1
          : -1;
      });
      setWorkshops(sortedWorkshops);
      setOrder("asc");
    }
  };

  //   function to get all the data of a workshop

  const getAllWorkshopData = (id) => {
    const endpoints = [
      `${import.meta.env.VITE_BACKEND_URL}/workshop/${id}`,
      `${import.meta.env.VITE_BACKEND_URL}/workshophasexistingwine/${id}`,
      `${import.meta.env.VITE_BACKEND_URL}/admin/workshop/${id}`,
    ];

    Promise.all(
      endpoints.map((endpoint) =>
        axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
      )
    )
      .then(([{ data: workshop }, { data: wines }, { data: user }]) => {
        setWorkshopById(workshop);
        setWinesOnWorkshop(wines);
        setUsersInWorkshop(user);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
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
                  return (
                    <tr
                      key={workshop.id}
                      onClick={() => {
                        setIsRowClicked(true);
                        getAllWorkshopData(workshop.id);
                      }}
                    >
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
                      <td>
                        <div className="actionButtons">
                          <button
                            type="button"
                            className="editBtn"
                            onClick={() => {
                              setIdToUpdate(workshop.id);
                              navigate("/admin/workshops/edit");
                            }}
                          >
                            <i className="fi fi-rr-edit" />
                          </button>
                          <button
                            type="button"
                            className="deleteBtn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsModalOpen(true);
                              setIdToDelete(workshop.id);
                            }}
                          >
                            <i className="fi fi-rr-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {/* modal to control the delete */}
          <div className={`deleteModal ${isModalOpen && "show"}`}>
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
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Annuler
              </ButtonPrimary>
            </div>
          </div>

          {/* Modal wich contains workshop information when click on the row */}

          {isLoaded && (
            <div className={`workshopInfoModal ${isRowClicked && "showInfo"}`}>
              <button
                className="closeModalBtn "
                type="button"
                onClick={() => setIsRowClicked(false)}
              >
                <i className="fi fi-tr-circle-xmark" />
              </button>

              <div className="modalContent">
                <div className="workshopHeader">
                  <h2>Atelier N° {workshopById.id}</h2>
                  <p>{refactorDate(workshopById.datetime)}</p>
                </div>
                <div className="workshopInfo">
                  <div className="infoType">
                    <p>Type :</p>
                    <div
                      className={
                        workshopById.wine_type.toLowerCase() === "rouge"
                          ? "redWine"
                          : "whiteWine"
                      }
                    />
                  </div>
                  <div className="infoPlace">
                    <p>Lieu :</p>
                    <p>{workshopById.place}</p>
                  </div>
                  <div className="infoCommentary">
                    <p>Commentaire :</p>
                    <p>{workshopById.commentary}</p>
                  </div>

                  <div>
                    <p>Vins dégustés :</p>
                    {winesOnWorkshop.map((wine) => (
                      <p>{wine.vintage}</p>
                    ))}
                  </div>
                  <div className="attendees">
                    <p>Participants :</p>
                    {usersInWorkshop.map((user) => {
                      return (
                        <div className="userCard">
                          <div
                            className={`banner ${
                              user.wine_color.toLowerCase() === "rouge"
                                ? "red"
                                : "white"
                            }`}
                          />
                          <div className="userInfo">
                            <div className="nameInfo">
                              <p>
                                {user.firstname} {user.lastname}
                              </p>

                              <p className="email">{user.email}</p>
                            </div>

                            <p className="pref">
                              " {user.preference_description} "
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <ButtonPrimary>modifier</ButtonPrimary>
              </div>
            </div>
          )}

          {/* background blur below the modal div */}
          {(isModalOpen || isRowClicked) && (
            <div
              className="modalBg"
              onClick={() => {
                setIsModalOpen(false);
                setIsRowClicked(false);
              }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default WorkshopsManagement;
