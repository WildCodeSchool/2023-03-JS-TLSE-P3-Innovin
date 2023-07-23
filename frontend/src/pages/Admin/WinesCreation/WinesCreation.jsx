import { useState } from "react";
import { useNavigate } from "react-router";
import AdminDashboard from "../../../components/Admin_Dashboard/Admin_Dashboard";
import "./WinesCreation.scss";
import Input from "../../../components/Input";
import Dropdown from "../../../components/Dropdown/Dropdown";
import SearchOrAdd from "../../../components/SearchOrAdd/SearchOrAdd";
import ButtonPrimary from "../../../components/ButtonPrimary";

function WinesCreation() {
  const navigate = useNavigate();

  const [deg, setDeg] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const [wineForm, setWineForm] = useState({
    vintage: 0,
    blend: "",
    color: "",
    alcohol_percentage: 0,
    picture: "",
    description: "",
    name: "",
    id_wine_region: 0,
    id_grape_variety: 0,
    id_winery: 0,
    is_archived: false,
  });

  const alcoholPercentage = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  return (
    <div className="winesCreation">
      <button
        type="button"
        onClick={() => navigate("/admin/wines")}
        className="backButton"
      >
        <i className="fi fi-rr-undo" />
      </button>
      <AdminDashboard />
      <div className="addWineContainer">
        <div className="addContent">
          <h1>Nouveau vin</h1>
          <form action="" method="post" className="createWineForm">
            <div className="section">
              <div className="wineName">
                <label htmlFor="name">Nom du vin</label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nom du vin"
                  required
                />
              </div>
              <div className="wineType">
                <label htmlFor="wine_type"> Type de vin</label>
                <Dropdown
                  id="color"
                  options={["Rouge", "Blanc"]}
                  name="wine_type"
                  object={wineForm}
                  setObject={setWineForm}
                  inputValue="Couleur du vin"
                />
              </div>
            </div>
            <div className="section">
              <SearchOrAdd
                label="Cépage"
                icon="grape"
                placeholder="Rechercher un cépage"
                id="id_grape_variety"
                query="grapevariety"
                field="name"
                formObject={wineForm}
                setFormObject={setWineForm}
              />
              <div className="vintage">
                <label htmlFor="vintage">Millésime</label>
                <Input
                  type="number"
                  name="vintage"
                  id="vintage"
                  min="1900"
                  max="2099"
                  step="1"
                  placeholder="1996"
                />
              </div>
            </div>
            <div className="section">
              <SearchOrAdd
                label="Domaine"
                icon="house-blank"
                placeholder="Rechercher un domaine"
                id="id_winery"
                query="winery"
                field="name"
                formObject={wineForm}
                setFormObject={setWineForm}
              />
              <SearchOrAdd
                label="Région viticole"
                icon="marker"
                placeholder="Rechercher une région"
                id="id_wine_region"
                query="wineregion"
                field="name"
                formObject={wineForm}
                setFormObject={setWineForm}
              />
            </div>

            <div className="section description">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                required
              />
            </div>

            <div className="section alcohol">
              <div className="alcoholHeader">
                <label htmlFor="alcohol_percentage" className="deg">
                  Degrés d'alcool :
                </label>
                <button
                  className="degBtn"
                  type="button"
                  onClick={() => setIsClicked(!isClicked)}
                >
                  {deg}°
                </button>
              </div>
              <div className="alcoholValues">
                {alcoholPercentage.map((degree) => (
                  <ButtonPrimary
                    className={`degValue ${deg === degree ? "selected" : ""} ${
                      isClicked && "visible"
                    }`}
                    key={degree}
                    type="button"
                    on
                    onClick={() => {
                      setDeg(degree);
                      setIsClicked(false);
                    }}
                  >
                    {degree}
                  </ButtonPrimary>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WinesCreation;
