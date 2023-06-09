import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import "./OlfactoryStage.css";
import StepsHeader from "../../components/StepsHeader/StepsHeader";
import Checkboxes from "../../components/Checkboxes/Checkboxes";
import TastingHeaderTitle from "../../components/TastingHeaderTitle";
import TastingContext from "../../contexts/TastingContext";
import Intensity from "../../assets/Icons/Intensity_Icon.svg";
import Complexity from "../../assets/Icons/Complexity_Icon.svg";
import Aromas from "../../components/Aromas/Aromas";
import TastingNoteContext from "../../contexts/TastingNoteContext";

export default function OlfactoryStage() {
  const { olfactiveData, visualDataKeys } = useContext(TastingContext);
  const { TastingNote } = useContext(TastingNoteContext);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/mouth/stage1");
  };

  const [selectedAromas, setSelectedAromas] = useState([]);

  const handleAromaClick = (idAromas) => {
    setSelectedAromas((prevSelectedAromas) => {
      if (prevSelectedAromas.includes(idAromas)) {
        return prevSelectedAromas.filter((id) => id !== idAromas);
      }
      return [...prevSelectedAromas, idAromas];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    formJson.aromas = selectedAromas;
    console.info(formJson);
  };

  console.info(TastingNote);

  return (
    <div className="page-container">
      <TastingHeaderTitle />
      <StepsHeader />
      <div className="nose1">
        <h2 className="h2-nose">
          Je devine l’intensité et la complexité de ses arômes
        </h2>
        <p>
          Sentez le vin sans l’aérer en laissant votre verre immobile. Quelles
          propriétés percevez-vous dans les arômes de votre vin ?
        </p>
      </div>
      <div className="checkbox">
        <form action="" className="formStage2" onSubmit={handleSubmit}>
          <div className="checkboxes">
            <Checkboxes
              name="Intensité"
              checks={visualDataKeys(olfactiveData, 0, 1)}
              ids={visualDataKeys(olfactiveData, 0, 0)}
              iconUrl={Intensity}
              id="idOlfactiveIntensity"
            />

            <Checkboxes
              name="Complexité"
              checks={visualDataKeys(olfactiveData, 1, 1)}
              ids={visualDataKeys(olfactiveData, 1, 0)}
              iconUrl={Complexity}
              id="idOlfactiveComplexity"
            />
          </div>
        </form>
      </div>
      <div className="nose2">
        <h2 className="h2-nose">Je libère ses arômes</h2>
        <p>
          Remuez votre verre en formant un petit cercle avec son pied sur une
          table ou en l’air, et humez son parfum. A quelle famille d’arôme
          appartient votre vin ?
        </p>
      </div>
      <Aromas
        name="Sélectionner un ou plusieurs arômes"
        tabIndex={0}
        iconUrl="/path/to/icon.png"
        ids={[1, 2, 3, 4, 5, 6, 7, 8]}
        id="idAromas"
        onAromaClick={handleAromaClick}
      />

      <div className="button-container">
        <ButtonPrimary type="submit" onClick={handleNavigate}>
          Etape suivante
        </ButtonPrimary>
      </div>
    </div>
  );
}
