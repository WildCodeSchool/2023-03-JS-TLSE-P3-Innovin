import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import "./OlfactoryStage.scss";
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
  const {
    setTastingNote,
    olfactorySelectedAromas,
    setOlfactorySelectedAromas,
  } = useContext(TastingNoteContext);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/mouth/stage1");
  };

  const handleAromaClick = (idAromas) => {
    setOlfactorySelectedAromas((prevSelectedAromas) => {
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
    formJson.aromas = olfactorySelectedAromas;
    console.info(formJson);

    // Mettre à jour le contexte TastingNote
    setTastingNote((prevTastingNote) => ({
      ...prevTastingNote,
      idOlfactiveAromas: olfactorySelectedAromas,
    }));
  };

  return (
    <div className="pageContainerNose">
      <TastingHeaderTitle />
      <StepsHeader />
      <div className="nose1">
        <h2 className="h2Nose">
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
        <h2 className="h2Nose">Je libère ses arômes</h2>
        <p className="pNose">
          Remuez votre verre en formant un petit cercle avec son pied sur une
          table ou en l’air, et humez son parfum. A quelle famille d’arôme
          appartient votre vin ?
        </p>
      </div>
      <Aromas
        className="aromes"
        name="Sélectionner un ou plusieurs arômes"
        tabIndex={0}
        iconUrl="/path/to/icon.png"
        ids={[1, 2, 3, 4, 5, 6, 7, 8]}
        id="idOlfactiveAromas"
        onAromaClick={handleAromaClick}
      />

      <div className="buttonContainer">
        <ButtonPrimary type="submit" onClick={handleNavigate}>
          Etape suivante
        </ButtonPrimary>
      </div>
    </div>
  );
}
