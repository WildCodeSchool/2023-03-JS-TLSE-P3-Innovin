import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AdminDashboard from "../../../components/Admin_Dashboard/Admin_Dashboard";
import "./WinesSheetsManagement.scss";
import AuthContext from "../../../contexts/AuthContext";
import SearchBar from "../../../components/SearchBar/SearchBar";

function WinesManager() {
  const { userToken } = useContext(AuthContext);
  const [areWinesLoaded, setAreWinesLoaded] = useState(false);
  const [wines, setWines] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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

  return (
    areWinesLoaded && (
      <div className="winesManager">
        <AdminDashboard />
        <div className="winesContent">
          <div className="winesHeader">
            <h1>Gestion des vins</h1>
            <SearchBar
              value={searchValue}
              placeholder="Rechercher un vin"
              setValue={setSearchValue}
              icon="search"
              className="searchBar"
            />
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

                          <button type="button" className="infoBtn">
                            <i className="fi fi-br-information" />
                          </button>
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
                      <p className="website">{wine.website}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    )
  );
}

export default WinesManager;
