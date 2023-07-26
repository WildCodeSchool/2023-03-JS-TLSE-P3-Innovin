import React, { useContext } from "react";
import PropTypes from "prop-types";
import TastingNoteContext from "../../contexts/TastingNoteContext";
import "./Aromas.scss";
import spice from "../../assets/Flavor_Img/Spices.jpg";
import wood from "../../assets/Flavor_Img/Wood.jpg";
import flower from "../../assets/Flavor_Img/Flower.jpg";
import vegetal from "../../assets/Flavor_Img/Vegetal.jpg";
import redFruits from "../../assets/Flavor_Img/Red_Fruits.jpg";
import coffee from "../../assets/Flavor_Img/Coffee.jpg";
import mineral from "../../assets/Flavor_Img/Mineral.jpg";
import animal from "../../assets/Flavor_Img/Animal.jpg";

function Aromas({ name, tabIndex, ids, id, onAromaClick }) {
  const tastingNoteValue = useContext(TastingNoteContext);
  const { tastingNote, setTastingNote } = tastingNoteValue;

  const handleFillObject = (index) => {
    const updatedAromas = tastingNote[id] || [];
    const updatedAroma = ids[index];

    if (updatedAromas.includes(updatedAroma)) {
      const filteredAromas = updatedAromas.filter(
        (aroma) => aroma !== updatedAroma
      );
      setTastingNote({
        ...tastingNote,
        [id]: filteredAromas,
      });
    } else {
      setTastingNote({
        ...tastingNote,
        [id]: [...updatedAromas, updatedAroma],
      });
    }
  };

  const isAromaSelected = (aroma) => {
    const selectedAromas = tastingNote[id] || [];
    return selectedAromas.includes(aroma);
  };

  const handleAromaClick = (aroma) => {
    const index = ids.findIndex((item) => item === aroma);
    handleFillObject(index);
    onAromaClick(aroma);
  };

  const handleKeyDown = (aroma) => (event) => {
    if (event.key === "Enter") {
      const index = ids.findIndex((item) => item === aroma);
      handleFillObject(index);
    }
  };

  return (
    <div className="aromas">
      <h3>{name}</h3>
      <div className="aromasSelection">
        <button
          type="button"
          className={`round  ${isAromaSelected(1) ? "selected" : ""}`}
          tabIndex={tabIndex}
          onClick={() => handleAromaClick(1)}
          onKeyDown={handleKeyDown(1)}
        >
          <div className="imgContainer">
            <img src={spice} alt="spice" />
            <span className="aroma-name">Epices</span>
          </div>
        </button>
        <button
          type="button"
          className={`round  ${isAromaSelected(2) ? "selected" : ""}`}
          tabIndex={tabIndex}
          onClick={() => handleAromaClick(2)}
          onKeyDown={handleKeyDown(2)}
        >
          <div className="imgContainer">
            <img src={wood} alt="wood" />
            <span className="aroma-name">Boisé</span>
          </div>
        </button>
        <button
          type="button"
          className={`round  ${isAromaSelected(3) ? "selected" : ""}`}
          tabIndex={tabIndex}
          onClick={() => handleAromaClick(3)}
          onKeyDown={handleKeyDown(3)}
        >
          <div className="imgContainer">
            <img src={flower} alt="flower" />
            <span className="aroma-name">Floral</span>
          </div>
        </button>
        <button
          type="button"
          className={`round  ${isAromaSelected(4) ? "selected" : ""}`}
          tabIndex={tabIndex}
          onClick={() => handleAromaClick(4)}
          onKeyDown={handleKeyDown(4)}
        >
          <div className="imgContainer">
            <img src={vegetal} alt="vegetal" />
            <span className="aroma-name">Végétal</span>
          </div>
        </button>

        <button
          type="button"
          className={`round  ${isAromaSelected(5) ? "selected" : ""}`}
          tabIndex={tabIndex}
          onClick={() => handleAromaClick(5)}
          onKeyDown={handleKeyDown(5)}
        >
          <div className="imgContainer">
            <img src={redFruits} alt="fruity" />
            <span className="aroma-name">Fruits</span>
          </div>
        </button>
        <button
          type="button"
          className={`round  ${isAromaSelected(6) ? "selected" : ""}`}
          tabIndex={tabIndex}
          onClick={() => handleAromaClick(6)}
          onKeyDown={handleKeyDown(6)}
        >
          <div className="imgContainer">
            <img src={coffee} alt="coffee" />
            <span className="aroma-name">Torréfié</span>
          </div>
        </button>
        <button
          type="button"
          className={`round  ${isAromaSelected(7) ? "selected" : ""}`}
          tabIndex={tabIndex}
          onClick={() => handleAromaClick(7)}
          onKeyDown={handleKeyDown(7)}
        >
          <div className="imgContainer">
            <img src={mineral} alt="mineral" />
            <span className="aroma-name">Minéral</span>
          </div>
        </button>
        <button
          type="button"
          className={`round  ${isAromaSelected(8) ? "selected" : ""}`}
          tabIndex={tabIndex}
          onClick={() => handleAromaClick(8)}
          onKeyDown={handleKeyDown(8)}
        >
          <div className="imgContainer">
            <img src={animal} alt="animal" />
            <span className="aroma-name">Animal</span>
          </div>
        </button>
      </div>
    </div>
  );
}

Aromas.propTypes = {
  name: PropTypes.string.isRequired,
  tabIndex: PropTypes.number.isRequired,
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  id: PropTypes.string.isRequired,
  onAromaClick: PropTypes.func.isRequired,
};

export default Aromas;
