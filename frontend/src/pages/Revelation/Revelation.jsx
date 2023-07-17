import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CardRevelation from "./CardRevelation";
import "./Revelation.css";
import TastingNoteContext from "../../contexts/TastingNoteContext";
import ButtonPrimary from "../../components/ButtonPrimary";

export default function Revelation() {
  // const for context
  const { userToken, tastingNote } = useContext(TastingNoteContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetching all wines with caracteristics
    axios
      .get("http://localhost:5000/existingwine", {
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

  // show only the wines that match with the tasting note
  const selectedWinesSet = new Set();
  const selectedWines = data.filter((wine) => {
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
      <h1 className="h1-revelation">REVELATION</h1>
      <p>Voici les vins correspondants à votre séléction</p>
      <div className="card-disposition">
        {selectedWines &&
          selectedWines.map((wine, index) => (
            <CardRevelation key={wine.id} wine={wine} cardNumber={index + 1} />
          ))}
      </div>
      <Link to="/creationworkshop">
        <ButtonPrimary> Création </ButtonPrimary>
      </Link>
    </div>
  );
}
