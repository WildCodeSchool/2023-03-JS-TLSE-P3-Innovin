import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AdminDashboard from "../../../components/Admin_Dashboard/Admin_Dashboard";
import "./WinesSheetsManagement.scss";
import AuthContext from "../../../contexts/AuthContext";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ModalValidation from "../../../components/ModalValidation/ModalValidation";
import ButtonPrimary from "../../../components/ButtonPrimary";

function WinesManager() {
  const { userToken } = useContext(AuthContext);
  const [areWinesLoaded, setAreWinesLoaded] = useState(false);
  const [wines, setWines] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isArchiveCardModalOpen, setIsArchiveCardModalOpen] = useState(false);
  const [wineToArchive, setWineToArchive] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/winesdata`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setWines(res.data);
        setAreWinesLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getWineById = (id) => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/onlyexistingwine/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setWineToArchive(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onArchive = (idWine) => {
    const { id, ...updatedData } = wineToArchive;

    const archivedWine = {
      ...updatedData,
      is_archived: 1,
    };

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/existingwine/${idWine}`,
        archivedWine,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.info(res);
        setWines(wines.filter((wine) => wine.id !== idWine));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    userToken &&
    areWinesLoaded && (
      <div className="winesManager">
        <AdminDashboard />
        <div className="winesContent">
          <div className="winesHeader">
            <h1>Gestion des vins</h1>
            <div className="searchAndAdd">
              {" "}
              <SearchBar
                value={searchValue}
                placeholder="Rechercher un vin"
                setValue={setSearchValue}
                icon="search"
                className="searchBar"
              />
              <ButtonPrimary
                className="addButton"
                onClick={() => navigate("/admin/wines/add")}
              >
                +
              </ButtonPrimary>
            </div>
          </div>
          <div className="winesList">
            {wines
              .filter((user) => {
                const values = Object.values(user);
                const filteredValues = values.some((value) => {
                  if (value !== null) {
                    if (Array.isArray(value)) {
                      return value.some((v) =>
                        v.toString().toLowerCase().includes(searchValue)
                      );
                    }
                    return value.toString().toLowerCase().includes(searchValue);
                  }
                  return false;
                });
                return filteredValues;
              })
              .map((wine) => {
                return (
                  <div className="wineCard" key={wine.id}>
                    <div
                      className={`colorBanner ${
                        wine.color.toLowerCase() === "rouge" ? "red" : "white"
                      }`}
                    />
                    {wine.picture.length ? (
                      <div className="wineImg">
                        <img
                          src={wine.picture}
                          alt="wine bottle"
                          className="bottleImg"
                        />
                      </div>
                    ) : (
                      <div className="wineImg">
                        <i className="fi fi-sr-grape" />
                      </div>
                    )}
                    <div className="wineInfo">
                      <div className="infoHeader">
                        <div className="wineHeader">
                          <div className="wineTitle">
                            {wine.name && <p className="title">{wine.name}</p>}
                            <p>{wine.grape_variety_name}</p>
                            <p className="winery">{wine.winery_name}</p>
                          </div>
                          <div className="buttons">
                            <button type="button" className="infoBtn">
                              <i className="fi fi-br-information" />
                            </button>
                            <button
                              type="button"
                              className="archiveBtn"
                              onClick={() => {
                                setIsArchiveCardModalOpen(true);
                                getWineById(wine.id);
                              }}
                            >
                              <i className="fi fi-rr-folder-upload" />
                            </button>
                          </div>
                        </div>
                        <div className="appellations">
                          {wine.appellation_name.map((appellation) => (
                            <p
                              key={appellation}
                              className={`appellation ${
                                wine.color.toLowerCase() === "rouge"
                                  ? "red"
                                  : "white"
                              }`}
                            >
                              {appellation}
                            </p>
                          ))}
                        </div>
                      </div>
                      <p className="description">
                        <span>Description : </span>
                        <br />
                        {wine.grape_variety_description}
                      </p>
                      {wine.website !== null && (
                        <div className="linkContainer">
                          <a
                            href={wine.website}
                            target="_blank"
                            rel="noreferrer"
                            className="website"
                          >
                            Découvrir le domaine
                          </a>
                          <i className="fi fi-br-arrow-alt-right" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {wineToArchive && (
          <ModalValidation
            isOpen={isArchiveCardModalOpen}
            setIsOpen={setIsArchiveCardModalOpen}
            question="Êtes-vous sûr de vouloir archiver ce vin ?"
            firstButton="archiver"
            actionFunction={onArchive}
            functionParam={wineToArchive.id}
            secondButton="Annuler"
          />
        )}
        {isArchiveCardModalOpen && (
          <div
            className="modalBg"
            onClick={() => {
              setIsArchiveCardModalOpen(false);
            }}
            aria-hidden="true"
          />
        )}
      </div>
    )
  );
}

export default WinesManager;
