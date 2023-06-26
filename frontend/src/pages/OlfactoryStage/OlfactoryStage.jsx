import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import "./OlfactoryStage.css";
import vegetal from "../../assets/Flavor_Img/Vegetal.jpg";
import spice from "../../assets/Flavor_Img/Spices.jpg";
import coffee from "../../assets/Flavor_Img/Coffee.jpg";
import animal from "../../assets/Flavor_Img/Animal.jpg";
import flower from "../../assets/Flavor_Img/Flower.jpg";
import mineral from "../../assets/Flavor_Img/Mineral.jpg";
import wood from "../../assets/Flavor_Img/Wood.jpg";
import redFruits from "../../assets/Flavor_Img/Red_Fruits.jpg";
import TastingHeaderTitle from "../../components/TastingHeaderTitle";

export default function OlfactoryStage() {
  const [selectedAromas, setSelectedAromas] = useState([]);

  const handleAromaClick = (aroma) => {
    if (selectedAromas.includes(aroma)) {
      setSelectedAromas(selectedAromas.filter((item) => item !== aroma));
    } else {
      setSelectedAromas([...selectedAromas, aroma]);
    }
  };

  const isAromaSelected = (aroma) => selectedAromas.includes(aroma);

  const handleKeyDown = (aroma) => (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleAromaClick(aroma);
    }
  };

  console.info("Selected Aromas:", selectedAromas);

  return (
    <div className="page-container">
      <div className="wine">
        <h2> Vin N1</h2>
      </div>
      <TastingHeaderTitle />
      <div className="nose1">
        <h2>Je devine l’intensité et la complexité de ses arômes</h2>
        <p>
          Sentez le vin sans l’aérer en laissant votre verre immobile. Quelles
          propriétés percevez-vous dans les arômes de votre vin ?
        </p>
      </div>
      <div className="checkbox">
        <div className="checkboxIntensity">ok</div>
        <div className="checkboxComplexity">ok</div>
      </div>
      <div className="nose2">
        <h2>Je libère ses arômes</h2>
        <p>
          Remuez votre verre en formant un petit cercle avec son pied sur une
          table ou en l’air, et humez son parfum. A quelle famille d’arôme
          appartient votre vin ?
        </p>
      </div>
      <div className="aromas">
        <h3>Sélectionner un ou plusieurs arômes</h3>
        <div className="aromasSelection">
          <div className="colonne1">
            <div
              className={`round aroma-item ${
                isAromaSelected("spices") ? "selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onClick={() => handleAromaClick("spices")}
              onKeyDown={handleKeyDown("spices")}
            >
              <img src={spice} alt="spice" />
              <span className="aroma-name">Épices</span>
            </div>
            <div
              className={`round aroma-item ${
                isAromaSelected("wood") ? "selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onClick={() => handleAromaClick("wood")}
              onKeyDown={handleKeyDown("wood")}
            >
              <img src={wood} alt="wood" />
              <span className="aroma-name">Bois</span>
            </div>
            <div
              className={`round aroma-item ${
                isAromaSelected("flower") ? "selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onClick={() => handleAromaClick("flower")}
              onKeyDown={handleKeyDown("flower")}
            >
              <img src={flower} alt="flower" />
              <span className="aroma-name">Fleurs</span>
            </div>
            <div
              className={`round aroma-item ${
                isAromaSelected("vegetal") ? "selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onClick={() => handleAromaClick("vegetal")}
              onKeyDown={handleKeyDown("vegetal")}
            >
              <img src={vegetal} alt="vegetal" />
              <span className="aroma-name">Végétal</span>
            </div>
          </div>
          <div className="colonne2">
            <div
              className={`round aroma-item ${
                isAromaSelected("fruity") ? "selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onClick={() => handleAromaClick("fruity")}
              onKeyDown={handleKeyDown("fruity")}
            >
              <img src={redFruits} alt="fruity" />
              <span className="aroma-name">Fruits</span>
            </div>
            <div
              className={`round aroma-item ${
                isAromaSelected("coffee") ? "selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onClick={() => handleAromaClick("coffee")}
              onKeyDown={handleKeyDown("coffee")}
            >
              <img src={coffee} alt="coffee" />
              <span className="aroma-name">Torréfié</span>
            </div>
            <div
              className={`round aroma-item ${
                isAromaSelected("mineral") ? "selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onClick={() => handleAromaClick("mineral")}
              onKeyDown={handleKeyDown("mineral")}
            >
              <img src={mineral} alt="mineral" />
              <span className="aroma-name">Minéral</span>
            </div>
            <div
              className={`round aroma-item ${
                isAromaSelected("animal") ? "selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onClick={() => handleAromaClick("animal")}
              onKeyDown={handleKeyDown("animal")}
            >
              <img src={animal} alt="animal" />
              <span className="aroma-name">Animal</span>
            </div>
          </div>
        </div>
      </div>
      <div className="button-container">
        <Link to="/eye/stage1">
          <ButtonPrimary> Etape suivante </ButtonPrimary>
        </Link>
      </div>
    </div>
  );
}
