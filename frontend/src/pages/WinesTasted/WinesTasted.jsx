import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import TastingNoteContext from "../../contexts/TastingNoteContext";
import Card from "./Card";
import "./WinesTasted.css";
import ButtonPrimary from "../../components/ButtonPrimary";

function WinesTasted() {
  const { userToken, setTastingNote, tastingNote } =
    useContext(TastingNoteContext);
  const [wines, setWines] = useState([]);
  const [selectedWineNumbers, setSelectedWineNumbers] = useState([]);

  useEffect(() => {
    // const userId = tastingNote.idUser;
    const apiUrl = `http://localhost:5000/tastingnote/1?idworkshop=2`;
    axios
      .get(apiUrl, {
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
  }, [tastingNote]);

  const handleWineSelection = (wineNumber, wineId) => {
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
    setTastingNote((prevTastingNote) => ({
      ...prevTastingNote,
      selectedWine: wineId,
    }));
  };

  console.info(tastingNote);

  return (
    <div className="wine-content">
      <div className="head-tested">
        <h2 className="title-tasted">Sélection</h2>
        <p className="p-tested">
          Sélectionnez au maximum 3 vins favoris parmi ceux dégustés
        </p>
      </div>
      <div className="card-disposition">
        {wines.map((wine, index) => (
          <Card
            key={wine.id}
            wine={wine}
            isSelected={selectedWineNumbers.includes(index + 1)}
            number={index + 1}
            onSelect={handleWineSelection}
          />
        ))}
      </div>
      <ButtonPrimary>Révélation</ButtonPrimary>
    </div>
  );
}

export default WinesTasted;
