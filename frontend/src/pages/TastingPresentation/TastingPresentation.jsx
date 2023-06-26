import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TastingContext from "./TastingContext";
import "./TastingPresentation.css";
import logo from "../../assets/Logo_W_Circles.svg";
import Navbar from "../../components/Navbar/Navbar";
import ButtonPrimary from "../../components/ButtonPrimary";

export default function TastingPresentation() {
  const { setTastingData } = useContext(TastingContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/tastingsheetsdatas"
        );
        const { data } = response;
        // Reforming objects to create a single object without IDs and duplicates
        const mergedObject = data.reduce((acc, obj) => {
          for (const key in obj) {
            if (key !== "id" && obj[key] !== null) {
              if (!acc[key]) {
                acc[key] = [];
              }
              acc[key].push(obj[key]);
            }
          }
          return acc;
        }, {});

        setTastingData(mergedObject);
      } catch (error) {
        console.warn(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="start-degust">
      <Navbar />
      <img className="logo" src={logo} alt="innovin logo" />
      <div className="page-content">
        <div className="box">
          <h1 className="title">Dégustation</h1>
          <p className="text">
            Vous vous apprêtez à déguster 5 vins monocépages avec une fiche à
            remplir pour chacun des vins.
            <br />
            <br />
            Vous allez être guidé tout au long du processus de dégustation.
            <br />
            Les vins dégustés ne vous seront dévoilés qu’à la fin de la
            dégustation de sorte à ce que vous ne puissiez vous fier uniquement
            à ce que vous ressentez!
            <br />
            <br />
            Soyez attentifs et laissez vous porter par vos sens.
          </p>

          <div className="button-container">
            <Link to="/eye/stage1">
              <ButtonPrimary> Démarrer </ButtonPrimary>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
