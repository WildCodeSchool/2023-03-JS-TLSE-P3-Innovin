/* eslint-disable camelcase */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TastingContext from "../../contexts/TastingContext";
import AuthContext from "../../contexts/AuthContext";
// import Aromas from "../../components/Aromas/Aromas";
import Checkboxes from "../../components/Checkboxes/Checkboxes";
import ButtonPrimary from "../../components/ButtonPrimary";
import StepsHeader from "../../components/StepsHeader/StepsHeader";
import TastingHeaderTitle from "../../components/TastingHeaderTitle";
import Intensity_Icon from "../../assets/Icons/Intensity_Icon.svg";
import Time_Icon from "../../assets/Icons/Time_Icon.svg";
import "./TasteStage2.scss";

function TasteStage2() {
  const tastingValue = useContext(TastingContext);
  const { mouthData, setMouthData } = tastingValue;
  const userToken = useContext(AuthContext);
  const navigate = useNavigate();

  // ----------------------------------------- Data recovery from backend server -----------------------------------------//

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/tastedatas`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setMouthData(response.data);
        console.info(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.info("Tableau mouthdata", mouthData);
  const visualDataKeys = (arr, x, y) => {
    const arrValues = [];
    if (arr && arr[x]) {
      const array = arr[x];
      array.forEach((el) => {
        if (el && el[y]) {
          const values = Object.values(el);
          arrValues.push(values[y]);
        }
      });
    }
    return arrValues;
  };

  useEffect(() => {
    if (mouthData) {
      visualDataKeys();
    } else {
      console.info("Pas de données !!!");
    }
  }, [mouthData]);

  // -----------------------------------------handle functions for buttons--------------------------------------------------

  const handleNavigate = () => {
    navigate("/advice");
  };

  console.info("Intensity item", visualDataKeys(mouthData, 0, 1));
  console.info("Intensisty ids", visualDataKeys(mouthData, 0, 0));
  console.info("Persistance", visualDataKeys(mouthData, 0, 1));
  console.info("Persistance Ids", visualDataKeys(mouthData, 0, 0));

  // -------------------------------------------return the component----------------------------------------------------

  return (
    <div className="TasteStage2">
      <div className="contentTasteStage2">
        <div className="header">
          <TastingHeaderTitle />
          <StepsHeader />
        </div>
        <div className="intro">
          <h3 className="subtitle">Je savoure ses arômes</h3>
          <p>
            Continuez de “grumer” votre vin en le mâchant délicatement, essayez
            de retrouver les arômes que vous avez humé dans l’étape précédente
            ou d’en découvrir de nouveaux.
            <br />
          </p>
          <p>Quels arômes distinguez vous ?</p>
        </div>
        <section className="section_aromes">{/* <Aromas /> */}</section>
        <div className="intro">
          <h3 className="subtitle">Je décris sa persistance aromatique</h3>
          <p>
            Déterminez son intensité et son impression en bouche en “mâchant”
            votre vin. Comment les définiriez vous ?
          </p>
        </div>
        <section className="section_persistanceAromatique">
          <Checkboxes
            name="Intensité"
            checks={visualDataKeys(mouthData, 0, 1)}
            ids={visualDataKeys(mouthData, 0, 0)}
            iconUrl={Intensity_Icon}
            id="idTasteIntensity"
          />
          <Checkboxes
            name="Persistance aromatique"
            checks={visualDataKeys(mouthData, 1, 1)}
            ids={visualDataKeys(mouthData, 1, 0)}
            iconUrl={Time_Icon}
            id="idTasteMouthFeel"
          />
        </section>
        <ButtonPrimary onClick={handleNavigate}>Etape suivante</ButtonPrimary>
      </div>
    </div>
  );
}
export default TasteStage2;
