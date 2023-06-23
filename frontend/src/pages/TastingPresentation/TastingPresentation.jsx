import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./TastingPresentation.css";
import axios from "axios";
import logo from "../../assets/Logo_W_Circles.svg";
import Navbar from "../../components/Navbar/Navbar";
import { TastingProvider } from "./TastingContext";
import ButtonPrimary from "../../components/ButtonPrimary";

export default function TastingPresentation() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/tastingsheetsdatas"
        );
        const { data } = response;
        // Reforming objects to create a single object without IDs and duplicates
        const mergedObject = data.reduce((results, obj) => {
          for (const key in obj) {
            if (key !== "id" && obj[key] !== null) {
              if (!results[key]) {
                // eslint-disable-next-line no-param-reassign
                results[key] = [];
              }
              results[key].push(obj[key]);
            }
          }
          return results;
        }, {});

        console.info(mergedObject);
      } catch (error) {
        console.warn(error);
      }
    };

    fetchData();
  }, []);

  return (
    <TastingProvider>
      <div className="start-degust">
        <Navbar />
        <img className="logo" src={logo} alt="" />
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
              dégustation de sorte à ce que vous ne puissiez vous fier
              uniquement à ce que vous ressentez!
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
    </TastingProvider>
  );
}
