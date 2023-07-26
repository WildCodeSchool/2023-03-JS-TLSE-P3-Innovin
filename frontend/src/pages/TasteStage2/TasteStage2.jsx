/* eslint-disable camelcase */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TastingContext from "../../contexts/TastingContext";
import TastingNoteContext from "../../contexts/TastingNoteContext";
import AuthContext from "../../contexts/AuthContext";
import Aromas from "../../components/Aromas/Aromas";
import Checkboxes from "../../components/Checkboxes/Checkboxes";
import ButtonPrimary from "../../components/ButtonPrimary";
import StepsHeader from "../../components/StepsHeader/StepsHeader";
import TastingHeaderTitle from "../../components/TastingHeaderTitle";
import Intensity_Icon from "../../assets/Icons/Intensity_Icon.svg";
import Time_Icon from "../../assets/Icons/Time_Icon.svg";
import "./TasteStage2.scss";

function TasteStage2() {
  const tastingValue = useContext(TastingContext);
  const { visualDataKeys, mouthData, setMouthData } = tastingValue;
  const { flavorSelectedAromas, setFlavorSelectedAromas } =
    useContext(TastingNoteContext);
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
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // ----------------------------------------- Flavor data management (aromas) -----------------------------------------//

  const handleAromaClick = (idFlavorAromas) => {
    setFlavorSelectedAromas((prevSelectedAromas) => {
      if (prevSelectedAromas.includes(idFlavorAromas)) {
        return prevSelectedAromas.filter((id) => id !== idFlavorAromas);
      }
      return [...prevSelectedAromas, idFlavorAromas];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    formJson.aromas = flavorSelectedAromas;
    console.info(formJson);
  };

  // -----------------------------------------handle functions for buttons--------------------------------------------------

  const handleNavigate = () => {
    navigate("/advice");
  };

  // -------------------------------------------return the component----------------------------------------------------

  return (
    mouthData && (
      <div className="TasteStage2">
        <div className="contentTasteStage2">
          <div className="header">
            <TastingHeaderTitle />
            <StepsHeader />
          </div>
          <div className="intro">
            <h3 className="subtitle">Je savoure ses arômes</h3>
            <p>
              Continuez de “grumer” votre vin en le mâchant délicatement,
              essayez de retrouver les arômes que vous avez humé dans l’étape
              précédente ou d’en découvrir de nouveaux.
              <br />
            </p>
            <p>Quels arômes distinguez vous ?</p>
          </div>
          <section className="section_aromes">
            <Aromas
              name="Sélectionner un ou plusieurs arômes"
              tabIndex={0}
              iconUrl="/path/to/icon.png"
              ids={[1, 2, 3, 4, 5, 6, 7, 8]}
              id="idFlavorAromas"
              onAromaClick={handleAromaClick}
            />
          </section>
          <div className="intro">
            <h3 className="subtitle">Je décris sa persistance aromatique</h3>
            <p>
              Déterminez son intensité et son impression en bouche en “mâchant”
              votre vin. Comment les définiriez vous ?
            </p>
          </div>
          <form action="" className="formTasteStage2" onSubmit={handleSubmit}>
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
          </form>
          <ButtonPrimary onClick={handleNavigate}>Etape suivante</ButtonPrimary>
        </div>
      </div>
    )
  );
}
export default TasteStage2;
