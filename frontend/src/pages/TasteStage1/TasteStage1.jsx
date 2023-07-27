import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TastingContext from "../../contexts/TastingContext";
import AuthContext from "../../contexts/AuthContext";
import ButtonPrimary from "../../components/ButtonPrimary";
import StepsHeader from "../../components/StepsHeader/StepsHeader";
import TastingHeaderTitle from "../../components/TastingHeaderTitle";
import SlidersTasteStage1 from "../../components/TasteStage1Sliders/TasteStage1Sliders";
import "./TasteStage1.scss";

function TasteStage1() {
  const tastingValue = useContext(TastingContext);
  const {
    dataSweetness,
    setDataSweetness,
    dataAcidity,
    setDataAcidity,
    dataAlcohol,
    setDataAlcohol,
    dataTasteTannin,
    setDataTasteTannin,
  } = tastingValue;
  const userToken = useContext(AuthContext);
  const navigate = useNavigate();

  // ----------------------------------------- Data recovery from backend server -----------------------------------------//

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/mouthslidersdatas`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setDataSweetness(response.data.sweetness);
        setDataAcidity(response.data.acidity);
        setDataAlcohol(response.data.alcohol);
        setDataTasteTannin(response.data.taste_tannin);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // -----------------------------------------handle functions for buttons--------------------------------------------------

  const handleNavigate = () => {
    navigate("/mouth/stage2");
  };

  // -------------------------------------------return the component----------------------------------------------------

  return (
    <div className="TasteStage1">
      <div className="contentTasteStage1">
        <div className="header">
          <TastingHeaderTitle />
          <StepsHeader />
        </div>
        <div className="intro">
          <h3 className="subtitle">J'apprécie son onctuosité</h3>
          <div className="taste1Text">
            <p>
              Mettez votre vin en bouche et “grumez-le” délicatement en aspirant
              un peu d’air entre vos lèvres.
            </p>
            <p>Comment est-il structuré ? </p>
          </div>
        </div>
        <div className="SlidersBoxTasteStage1">
          <SlidersTasteStage1
            dataAlcohol={dataAlcohol}
            dataSweetness={dataSweetness}
            dataAcidity={dataAcidity}
            dataTasteTannin={dataTasteTannin}
          />
        </div>
        <ButtonPrimary onClick={handleNavigate}>Etape suivante</ButtonPrimary>
      </div>
    </div>
  );
}
export default TasteStage1;
