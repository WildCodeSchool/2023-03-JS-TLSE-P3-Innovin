import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TastingContext from "../../contexts/TastingContext";
import "./TastingPresentation.css";
import logo from "../../assets/Logo_W_Circles.svg";
import Navbar from "../../components/Navbar/Navbar";
import ButtonPrimary from "../../components/ButtonPrimary";

export default function TastingPresentation() {
  // destructuring the context and each value needed to store data in states
  const tastingValue = useContext(TastingContext);
  const { setVisualData, setOlfactiveData, setMouthSlidersData, setMouthData } =
    tastingValue;

  // ------------------------------------------------------functions--------------------------------------------------------

  // function to merge the data from the API into a single array

  const mergeData = (data) => {
    return data.reduce((acc, obj) => {
      for (const key in obj) {
        if (key !== "id" && obj[key] !== null) {
          const index = acc.findIndex((item) => item.key === key);
          if (index === -1) {
            acc.push({ key, values: [obj[key]] });
          } else {
            acc[index].values.push(obj[key]);
          }
        }
      }
      return acc;
    }, []);
  };

  // function to get the data with multiple endpoints
  const getData = () => {
    const endpoints = [
      "http://localhost:5000/visualdatas",
      "http://localhost:5000/olfactivedatas",
      "http://localhost:5000/mouthslidersdatas",
      "http://localhost:5000/tastedatas",
    ];

    Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(
        ([
          { data: eye },
          { data: nose },
          { data: mouth1 },
          { data: mouth2 },
        ]) => {
          const eyeData = mergeData(eye);
          const noseData = mergeData(nose);
          const mouthSlidersData = mergeData(mouth1);
          const mouthData = mergeData(mouth2);

          setVisualData(eyeData);
          setOlfactiveData(noseData);
          setMouthSlidersData(mouthSlidersData);
          setMouthData(mouthData);
        }
      )
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // --------------------------------------------------return the page-----------------------------------------------------------
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
