import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CardRevelation from "./CardRevelation";
import "./Revelation.scss";
import TastingNoteContext from "../../contexts/TastingNoteContext";
import CreationWorkshopContext from "../../contexts/CreationWorkshopContext";
import ButtonPrimary from "../../components/ButtonPrimary";

export default function Revelation() {
  // const for context
  const CreationWorkshopValue = useContext(CreationWorkshopContext);
  const { nextWorkshops, setNewWineId } = CreationWorkshopValue;
  const { userToken, tastingNote } = useContext(TastingNoteContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetching all wines with caracteristics
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/existingwine`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [userToken]);

  // Create a new wine
  const postNewWine = () => {
    const newWine = {
      newWine: { color: `${nextWorkshops[0].wine_type}` },
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/newwine`, newWine, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setNewWineId(res.data.insertId);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // show only the wines that match with the tasting note
  const selectedWinesSet = new Set();
  const selectedWinesData = data.filter((wine) => {
    if (
      tastingNote.selectedWinesIds.includes(wine.id) &&
      !selectedWinesSet.has(wine.id)
    ) {
      selectedWinesSet.add(wine.id);
      return true;
    }
    return false;
  });

  return (
    <div className="page-revel">
      <div className="header">
        <h1 className="h1-revelation">REVELATION</h1>
        <p>Voici les vins correspondants à votre séléction</p>
      </div>

      <div className="card-disposition">
        {selectedWinesData &&
          selectedWinesData.map((wine) => (
            <CardRevelation key={wine.id} wine={wine} cardNumber={wine.id} />
          ))}
      </div>
      <Link to="/creationworkshop">
        <ButtonPrimary onClick={postNewWine}> Création </ButtonPrimary>
      </Link>
    </div>
  );
}
