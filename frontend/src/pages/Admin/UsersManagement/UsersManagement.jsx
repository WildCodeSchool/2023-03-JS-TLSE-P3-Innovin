import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AdminDashboard from "../../../components/Admin_Dashboard/Admin_Dashboard";
import AuthContext from "../../../contexts/AuthContext";
import "./UsersManagement.scss";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ModalValidation from "../../../components/ModalValidation/ModalValidation";
import AdminContext from "../../../contexts/AdminContext";

function UsersManagement() {
  const { userToken } = useContext(AuthContext);
  const { setUserIdToUpdate } = useContext(AdminContext);
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [areUsersLoaded, setAreUsersLoaded] = useState(false);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [sortColOrder, setSortColOrder] = useState("");
  const [sortUsersColumns, setSortUsersColumns] = useState("");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(0);
  const [isRowClicked, setIsRowClicked] = useState(false);
  const [userById, setUserById] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setAreUsersLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getUserData = (id) => {
    // const endpoints = [
    //   `${import.meta.env.VITE_BACKEND_URL}/workshop/${id}`,
    //   `${import.meta.env.VITE_BACKEND_URL}/workshophasexistingwine/${id}`,
    //   `${import.meta.env.VITE_BACKEND_URL}/admin/workshop/${id}`,
    // ];

    // Promise.all(
    //   endpoints.map((endpoint) =>
    //     axios.get(endpoint, {
    //       headers: {
    //         Authorization: `Bearer ${userToken}`,
    //       },
    //     })
    //   )
    // )
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setUserById(res.data);
        setIsUserLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.info(res);
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const sortUsers = (col) => {
    let newSortOrder = "asc";

    if (sortUsersColumns === col && sortColOrder === "asc") {
      newSortOrder = "desc";
    }

    const sortedUsers = users.sort((a, b) => {
      const aValue = a[col].toString().toLowerCase();
      const bValue = b[col].toString().toLowerCase();

      if (newSortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    setUsers(sortedUsers);
    setSortUsersColumns(col);
    setSortColOrder(newSortOrder);
  };

  return (
    userToken &&
    areUsersLoaded && (
      <>
        <AdminDashboard />
        <div className="usersManagement">
          <div className="userTableHeader">
            <h1>Gestion des utilisateurs</h1>
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
            <table className="usersTable">
              <thead>
                <tr>
                  <th onClick={() => sortUsers("lastname")}>
                    <div>
                      <p> Nom</p>
                      {sortColOrder === "asc" &&
                      sortUsersColumns === "lastname" ? (
                        <i className="fi fi-rr-angle-small-up" />
                      ) : (
                        <i className="fi fi-rr-angle-small-down" />
                      )}
                    </div>
                  </th>
                  <th onClick={() => sortUsers("email")}>
                    <div>
                      <p>Email</p>
                      {sortColOrder === "asc" &&
                      sortUsersColumns === "email" ? (
                        <i className="fi fi-rr-angle-small-up" />
                      ) : (
                        <i className="fi fi-rr-angle-small-down" />
                      )}
                    </div>
                  </th>
                  <th onClick={() => sortUsers("wine_color")}>
                    <div>
                      <p>Préférence</p>
                      {sortColOrder === "asc" &&
                      sortUsersColumns === "wine_color" ? (
                        <i className="fi fi-rr-angle-small-up" />
                      ) : (
                        <i className="fi fi-rr-angle-small-down" />
                      )}
                    </div>
                  </th>
                  <th onClick={() => sortUsers("preference_description")}>
                    <div>
                      <p> description</p>
                      {sortColOrder === "asc" &&
                      sortUsersColumns === "preference_description" ? (
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
                {users
                  .filter((user) => {
                    const values = Object.values(user);
                    const filteredValues = values.some((value) =>
                      value.toString().toLowerCase().includes(searchValue)
                    );
                    return filteredValues;
                  })
                  .map((user) => {
                    return (
                      <tr
                        key={user.id}
                        onClick={() => {
                          setIsRowClicked(true);
                          getUserData(user.id);
                        }}
                      >
                        <td>
                          {user.lastname} {user.firstname}
                        </td>
                        <td>{user.email}</td>
                        {user.wine_color.toLowerCase() === "rouge" ? (
                          <td>
                            <div className="redWine" />
                          </td>
                        ) : (
                          <td>
                            <div className="whiteWine" />
                          </td>
                        )}
                        <td>
                          <p className="prefDesc">
                            {user.preference_description}
                          </p>
                        </td>
                        <td>
                          <div className="actionButtons">
                            <button
                              type="button"
                              className="editBtn"
                              onClick={() => {
                                setUserIdToUpdate(user.id);
                                // navigate("/admin/workshops/edit");
                              }}
                            >
                              <i className="fi fi-rr-edit" />
                            </button>
                            <button
                              type="button"
                              className="deleteBtn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsUserModalOpen(true);
                                setUserIdToDelete(user.id);
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
              isOpen={isUserModalOpen}
              setIsOpen={setIsUserModalOpen}
              question="Êtes-vous sûr de vouloir supprimer l'atelier ?"
              firstButton="Supprimer"
              actionFunction={onDelete}
              functionParam={userIdToDelete}
              secondButton="Annuler"
            />

            {/* Modal wich contains workshop information when click on the row */}

            {isUserLoaded && (
              <div
                className={`workshopInfoModal ${isRowClicked && "showInfo"}`}
              >
                <button
                  className="closeModalBtn "
                  type="button"
                  onClick={() => setIsRowClicked(false)}
                >
                  <i className="fi fi-tr-circle-xmark" />
                </button>

                <div className="modalContent">
                  <div className="workshopHeader">
                    <h2>Atelier N° {userById.id}</h2>
                    <p />
                  </div>
                  <div className="workshopInfo">
                    <div className="infoType">
                      <p>Type :</p>
                    </div>
                    <div className="infoPlace">
                      <p>Lieu :</p>
                      <p>{userById.place}</p>
                    </div>
                    <div className="infoCommentary">
                      <p>Commentaire :</p>
                      <p>{userById.commentary}</p>
                    </div>

                    {/* <div className="attendees">
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
                    </div> */}
                  </div>
                  <ButtonPrimary>modifier</ButtonPrimary>
                </div>
              </div>
            )}

            {/* background blur below the modal div */}
            {(isUserModalOpen || isRowClicked) && (
              <div
                className="modalBg"
                onClick={() => {
                  setIsUserModalOpen(false);
                  setIsRowClicked(false);
                }}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </>
    )
  );
}

export default UsersManagement;
