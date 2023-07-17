import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AdminDashboard from "../../../components/Admin_Dashboard/Admin_Dashboard";
import AdminContext from "../../../contexts/AdminContext";
import "./WorkshopsManagement.scss";
import SearchBar from "../../../components/SearchBar/SearchBar";
import AuthContext from "../../../contexts/AuthContext";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ModalValidation from "../../../components/ModalValidation/ModalValidation";

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
  const [sortOrder, setSortOrder] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const navigate = useNavigate();

  //   ----------------------------------------functions-------------------------------------------------------

  // function to get the workshops data
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/workshop`, {
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
    let newSortOrder = "asc";

    if (sortColumn === col && sortOrder === "asc") {
      newSortOrder = "desc";
    }

    const sortedWorkshops = workshops.sort((a, b) => {
      const aValue = a[col].toString().toLowerCase();
      const bValue = b[col].toString().toLowerCase();

      if (newSortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    setWorkshops(sortedWorkshops);
    setSortColumn(col);
    setSortOrder(newSortOrder);
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
          <div className="searchOrAdd">
            <SearchBar
              className="searchBar"
              setValue={setSearchValue}
              icon="search"
              placeholder="Rechercher"
              value={searchValue}
            />
            <ButtonPrimary
              className="addButton"
              onClick={() => navigate("/admin/workshops/add")}
            >
              +
            </ButtonPrimary>
          </div>
        </div>
        <div className="tableSection">
          <table className="workshopsTable">
            <thead>
              <tr>
                <th onClick={() => sortWorkshops("datetime")}>
                  <div>
                    <p> Date</p>
                    {sortOrder === "asc" && sortColumn === "datetime" ? (
                      <i className="fi fi-rr-angle-small-up" />
                    ) : (
                      <i className="fi fi-rr-angle-small-down" />
                    )}
                  </div>
                </th>
                <th onClick={() => sortWorkshops("wine_type")}>
                  <div>
                    <p>Type</p>
                    {sortOrder === "asc" && sortColumn === "wine_type" ? (
                      <i className="fi fi-rr-angle-small-up" />
                    ) : (
                      <i className="fi fi-rr-angle-small-down" />
                    )}
                  </div>
                </th>
                <th onClick={() => sortWorkshops("place")}>
                  <div>
                    <p>Lieu</p>
                    {sortOrder === "asc" && sortColumn === "place" ? (
                      <i className="fi fi-rr-angle-small-up" />
                    ) : (
                      <i className="fi fi-rr-angle-small-down" />
                    )}
                  </div>
                </th>
                <th onClick={() => sortWorkshops("commentary")}>
                  <div>
                    <p> Commentaire</p>
                    {sortOrder === "asc" && sortColumn === "commentary" ? (
                      <i className="fi fi-rr-angle-small-up" />
                    ) : (
                      <i className="fi fi-rr-angle-small-down" />
                    )}
                  </div>
                </th>
                <th onClick={() => sortWorkshops("attendees")}>
                  <div>
                    <p>Participants</p>
                    {sortOrder === "asc" && sortColumn === "attendees" ? (
                      <i className="fi fi-rr-angle-small-up" />
                    ) : (
                      <i className="fi fi-rr-angle-small-down" />
                    )}
                  </div>
                </th>
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
          <ModalValidation
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            question="Êtes-vous sûr de vouloir supprimer l'atelier ?"
            firstButton="Supprimer"
            actionFunction={onDelete}
            functionParam={idToDelete}
            secondButton="Annuler"
          />

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
                      <p key={wine.id_existing_wine}>{wine.vintage}</p>
                    ))}
                  </div>
                  <div className="attendees">
                    <p>Participants :</p>
                    {usersInWorkshop.map((user) => {
                      return (
                        <div className="userCard" key={user.id}>
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
