import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TastingContext from "../../contexts/TastingContext";
import CreationWorkshopContext from "../../contexts/CreationWorkshopContext";
import "./TastingPresentation.css";
import Navbar from "../../components/Navbar/Navbar";
import "./TastingPresentation.scss";
import ButtonPrimary from "../../components/ButtonPrimary";
import AuthContext from "../../contexts/AuthContext";

export default function TastingPresentation() {
  // destructuring the context and each value needed to store data in states
  const CreationWorkshopValue = useContext(CreationWorkshopContext);
  const { setVisualData, setOlfactiveData, setWorkshopHasExistingWine } =
    useContext(TastingContext);
  const { nextWorkshops, setNextWorkshops } = CreationWorkshopValue;
  const { userToken } = useContext(AuthContext);

  // --------------------------------------------------Fetch to get the next workshop-----------------------------------------------------------

  useEffect(() => {
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

  // ------------------------------------------------------functions--------------------------------------------------------

  // function to get the data with multiple endpoints
  const getData = () => {
    if (nextWorkshops.length > 0) {
      const endpoints = [
        "http://localhost:5000/visualdatas",
        "http://localhost:5000/olfactivedatas",
        `http://localhost:5000/workshophasexistingwine/${nextWorkshops[0].id}`,
      ];

      Promise.all(
        endpoints.map((endpoint) =>
          axios.get(endpoint, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
        )
      )
        .then(([{ data: eye }, { data: nose }, { data: winesWorkshop }]) => {
          setVisualData(eye);
          setOlfactiveData(nose);
          setWorkshopHasExistingWine(winesWorkshop); // Utilisez setWorkshopData pour stocker les données de workshophasexistingwine
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    getData();
  }, [nextWorkshops]);

  // --------------------------------------------------return the page-----------------------------------------------------------
  return (
    userToken && (
      <div className="startDegust">
        <div className="pageContentDegust">
          <div className="box">
            <h1 className="titleDegust">Dégustation</h1>
            <p className="textDegust">
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

            <div className="buttonContainer">
              <Link to="/eye/stage1">
                <ButtonPrimary type="button">Démarrer</ButtonPrimary>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
