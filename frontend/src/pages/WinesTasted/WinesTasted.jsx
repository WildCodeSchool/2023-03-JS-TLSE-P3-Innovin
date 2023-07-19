import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TastingNoteContext from "../../contexts/TastingNoteContext";
import CreationWorkshopContext from "../../contexts/CreationWorkshopContext";
import Card from "./Card";
import "./WinesTasted.css";
import ButtonPrimary from "../../components/ButtonPrimary";

function WinesTasted() {
  // const for context
  const CreationWorkshopValue = useContext(CreationWorkshopContext);
  const { userToken, tastingNote, setSelectedWinesIds } =
    useContext(TastingNoteContext);
  const {
    wineSelectedCounter,
    setWineSelectedCounter,
    nextWorkshops,
    setNextWorkshops,
    setMaxSelected,
    maxSelected,
  } = CreationWorkshopValue;
  // const { idUser } = tastingNote;

  // const for fetch
  const [wines, setWines] = useState([]);
  const [existingWineWorkshops, setExistingWineWorkshops] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch to get the next workshop
        const nextWorkshopsApiUrl = "http://localhost:5000/nextworkshops";
        const response = await axios.get(nextWorkshopsApiUrl, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setNextWorkshops(response.data);

        // Fetch to get tasting note of dynamic user and workshop
        const apiUrl = `http://localhost:5000/tastingnote`;
        const tastingNoteResponse = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setWines(tastingNoteResponse.data);

        // Fetch workshops with existing wine to match with tasting note
        const existingWineWorkshopsApiUrl =
          "http://localhost:5000/workshophasexistingwine";
        const existingWineWorkshopsResponse = await axios.get(
          existingWineWorkshopsApiUrl,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setExistingWineWorkshops(existingWineWorkshopsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
      <div className="card-disposition">
        {wines
          .filter((wine) =>
            existingWineWorkshops.some(
              (workshop) =>
                workshop.id_workshop === nextWorkshops[0].id &&
                workshop.id_existing_wine === wine.id
            )
          )
          // Sort the wines based on their IDs
          .sort((wineA, wineB) => wineA.id - wineB.id)
          .map((wine, index) => (
            <Card
              key={wine.id}
              wine={wine}
              isSelected={tastingNote.selectedWinesIds.includes(wine.id)}
              number={index + 1}
              onSelect={handleWineSelection}
            />
          ))}
      </div>

      <Link to="/revelation">
        <ButtonPrimary> Révélation</ButtonPrimary>
      </Link>
    </div>
  );
}

export default WinesTasted;
