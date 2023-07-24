import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TastingNoteContext from "../../contexts/TastingNoteContext";
import CreationWorkshopContext from "../../contexts/CreationWorkshopContext";
import AuthContext from "../../contexts/AuthContext";
import Card from "./Card";
import "./WinesTasted.css";
import ButtonPrimary from "../../components/ButtonPrimary";

function WinesTasted() {
  // const for context
  const CreationWorkshopValue = useContext(CreationWorkshopContext);
  const { userToken } = useContext(AuthContext);
  const { tastingNote, setSelectedWinesIds } = useContext(TastingNoteContext);
  const {
    wineSelectedCounter,
    setWineSelectedCounter,
    setNextWorkshops,
    setMaxSelected,
    maxSelected,
  } = CreationWorkshopValue;

  // const for fetch
  const [wines, setWines] = useState([]);

  // fetch to get tasting note of dynamic user and workshop
  useEffect(() => {
    const apiUrl = `http://localhost:5000/tastingnote/2?idworkshop=1`;
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setWines(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userToken]);

  useEffect(() => {
    // Fetch to get the next workshop
    const nextWorkshopsApiUrl = "http://localhost:5000/nextworkshops";
    axios
      .get(nextWorkshopsApiUrl, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setNextWorkshops(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userToken]);

  // Selection wine for TastingNote max 3
  const handleWineSelection = (wineId) => {
    const currentSelectedWinesIds = tastingNote.selectedWinesIds;
    const isWineSelected = currentSelectedWinesIds.includes(wineId);

    if (isWineSelected) {
      setSelectedWinesIds(
        currentSelectedWinesIds.filter((id) => id !== wineId)
      );
      setWineSelectedCounter(wineSelectedCounter - 1); // Décrémenter le compteur lors de la déselection
    } else if (currentSelectedWinesIds.length < 3) {
      setSelectedWinesIds([...currentSelectedWinesIds, wineId]);
      setWineSelectedCounter(wineSelectedCounter + 1); // Incrémenter le compteur lors de la sélection
    } else {
      setMaxSelected(!maxSelected);
    }
  };

  return (
    <div className="wine-content">
      <div className="head-tested">
        <h2 className="title-tasted">Sélection</h2>
        <p className="p-tested">
          Sélectionnez au maximum 3 vins favoris parmi ceux dégustés
        </p>
      </div>
      {wines.length > 0 && (
        <div className="card-disposition">
          {wines.map((wine, index) => (
            <Card
              key={wine.id}
              wine={wine}
              isSelected={tastingNote.selectedWinesIds.includes(wine.id)}
              number={index + 1}
              onSelect={handleWineSelection}
            />
          ))}
        </div>
      )}

      <Link to="/revelation">
        <ButtonPrimary> Révélation</ButtonPrimary>
      </Link>
    </div>
  );
}

export default WinesTasted;
