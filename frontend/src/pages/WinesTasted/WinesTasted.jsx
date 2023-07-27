import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TastingNoteContext from "../../contexts/TastingNoteContext";
import CreationWorkshopContext from "../../contexts/CreationWorkshopContext";
import AuthContext from "../../contexts/AuthContext";
import Card from "./Card";
import "./WinesTasted.scss";
import ButtonPrimary from "../../components/ButtonPrimary";

function WinesTasted() {
  // const for context
  const CreationWorkshopValue = useContext(CreationWorkshopContext);
  const { userToken, user } = useContext(AuthContext);
  const { tastingNote, setSelectedWinesIds, setSelectedTastedWinesIds } =
    useContext(TastingNoteContext);
  const {
    wineSelectedCounter,
    setWineSelectedCounter,
    nextWorkshops,
    setMaxSelected,
    maxSelected,
  } = CreationWorkshopValue;

  // const for fetch
  const [wines, setWines] = useState([]);

  // fetch to get tasting note of dynamic user and workshop

  useEffect(() => {
    const apiUrl = `http://localhost:5000/tastingnote/${user.id}?idworkshop=${nextWorkshops[0].id}`;
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

  // Selection wine for TastingNote max 3

  const handleWineSelection = (wineNumber, tastedWineId) => {
    // Récupérer les tableaux actuels des vins sélectionnés et dégustés
    const currentTastedWinesIds = tastingNote.selectedTastedWinesIds;
    const currentSelectedWinesIds = tastingNote.selectedWinesIds;

    // Vérifier si le vin est déjà sélectionné et dégusté
    const isWineSelected = currentSelectedWinesIds.includes(wineNumber);

    // Gérer la sélection et la dégustation en fonction de l'état actuel
    if (isWineSelected) {
      setSelectedTastedWinesIds(
        currentTastedWinesIds.filter((id) => id !== tastedWineId)
      );
      setSelectedWinesIds(
        currentSelectedWinesIds.filter((id) => id !== wineNumber)
      );
      setWineSelectedCounter(wineSelectedCounter - 1); // Décrémenter le compteur lors de la déselection
    } else if (currentSelectedWinesIds.length < 3) {
      setSelectedTastedWinesIds([...currentTastedWinesIds, tastedWineId]);
      setSelectedWinesIds([...currentSelectedWinesIds, wineNumber]);
      setWineSelectedCounter(wineSelectedCounter + 1); // Incrémenter le compteur lors de la sélection
    } else {
      setMaxSelected(!maxSelected);
    }
  };

  return (
    <div className="wineContent">
      <div className="headTested">
        <h2 className="titleTasted">Sélection</h2>
        <p className="pTested">
          Sélectionnez au maximum 3 vins favoris parmi ceux dégustés
        </p>
      </div>
      {wines.length > 0 && (
        <div className="cardDisposition">
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
