import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import TastingNoteContext from "../../contexts/TastingNoteContext";
import AuthContext from "../../contexts/AuthContext";
import Card from "./Card";
import "./WinesTasted.css";
import ButtonPrimary from "../../components/ButtonPrimary";

function WinesTasted() {
  // const { tastingNote } = useContext(TastingNoteContext);
  const { userToken } = useContext(AuthContext);
  const [wines, setWines] = useState([]);
  const [selectedWineNumbers, setSelectedWineNumbers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/workshophasexistingwine/1", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setWines(response.data);
        console.info(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tastingnote", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response2) => {
        setWines(response2.data);
        console.info(response2.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleWineSelection = (wineNumber) => {
    if (selectedWineNumbers.includes(wineNumber)) {
      setSelectedWineNumbers((prevSelectedWineNumbers) =>
        prevSelectedWineNumbers.filter((number) => number !== wineNumber)
      );
    } else {
      setSelectedWineNumbers((prevSelectedWineNumbers) => [
        ...prevSelectedWineNumbers,
        wineNumber,
      ]);
    }
  };

  // console.info(tastingNote);

  return (
    <div className="wine-content">
      <div className="head-tested">
        <h2 className="title-tasted">Séléction</h2>
        <p className="p-tested">
          Sélectionnez au maximum 3 vins favoris parmi ceux dégustés
        </p>
      </div>
      <div className="card-disposition">
        {wines.map((wine, index) => (
          <Card
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            wine={wine}
            isSelected={selectedWineNumbers.includes(wine.id_existing_wine)}
            number={wine.id_existing_wine}
            onSelect={handleWineSelection}
          />
        ))}
      </div>
      <ButtonPrimary>Révélation</ButtonPrimary>
    </div>
  );
}

export default WinesTasted;
