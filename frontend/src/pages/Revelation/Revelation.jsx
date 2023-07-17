import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CardRevelation from "./CardRevelation";
import "./Revelation.css";
import TastingNoteContext from "../../contexts/TastingNoteContext";
import ButtonPrimary from "../../components/ButtonPrimary";

export default function Revelation() {
  const { userToken } = useContext(TastingNoteContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/existingwine", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setData(response.data);
        console.info(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  return (
    <div className="page-revel">
      <h1 className="h1-revelation">REVELATION</h1>
      <div className="card-disposition">
        {data && data.length > 0 ? (
          data.map((wine, index) => (
            <CardRevelation
              key={`${wine.id}-${wine.appellation_name}`}
              wine={wine}
              cardNumber={index + 1}
            />
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
      <Link to="/creationworkshop">
        <ButtonPrimary> Création </ButtonPrimary>
      </Link>
    </div>
  );
}
