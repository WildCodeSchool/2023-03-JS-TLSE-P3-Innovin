import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TastingContext from "../../contexts/TastingContext";
import ButtonPrimary from "../../components/ButtonPrimary";
import StepsHeader from "../../components/StepsHeader/StepsHeader";
import TastingHeaderTitle from "../../components/TastingHeaderTitle";
import Checkboxes from "../../components/Checkboxes/Checkboxes";
import "./VisualStage2.css";
import intensity from "../../assets/Icons/Intensity_Icon.svg";
import shiny from "../../assets/Icons/Shiny_Icon_2.svg";
import transparency from "../../assets/Icons/Transparency_Icon.svg";
import drop from "../../assets/Icons/Drop_Icon.svg";

function VisualStage2() {
  const tastingValue = useContext(TastingContext);
  const { visualData } = tastingValue;

  const limpidityId = visualData[0].map((el) => el.vl_id);
  const limpidityChecks = visualData[0].map((el) => el.limpidity);
  const brightnessId = visualData[1].map((el) => el.vb_id);
  const brightnessChecks = visualData[1].map((el) => el.brightness);
  const intensityId = visualData[2].map((el) => el.vi_id);
  const intensityChecks = visualData[2].map((el) => el.intensity);
  const tearsId = visualData[3].map((el) => el.vt_id);
  const tearsChecks = visualData[3].map((el) => el.tears);

  // -----------------------------------------handle functions for buttons--------------------------------------------------

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/nose/stage1");
  };

  // -------------------------------------------return the component----------------------------------------------------

  return (
    <div className="visualStage2">
      <div className="contentStage2">
        <div className="header">
          <TastingHeaderTitle />
          <StepsHeader />
        </div>
        <div className="intro">
          <h3 className="subtitle">J'observe son aspect</h3>
          <p>
            Comtemplez ses reflets, son dépôt, son voile, la matière en
            suspension et les coulures de ses larmes. Selon vous, quelles
            caractéristiques visuelles s’appliquent à ce vin ?{" "}
          </p>
          <p className="tip">
            Astuce : la clarté du vin donne des indications sur sa qualité et
            son âge. Ensuite, portez une attention particulière aux reflets et à
            la viscosité pour percevoir des indications sur sa concentration et
            sa texture.
          </p>
        </div>
        {/* <form action="" className="formStage2" onSubmit={handleSubmit}> */}
        <div className="checkboxes">
          <Checkboxes
            name="limpidité"
            checks={limpidityChecks}
            ids={limpidityId}
            iconUrl={transparency}
            id="idVisualLimpidity"
          />
          <Checkboxes
            name="Brillance"
            checks={brightnessChecks}
            ids={brightnessId}
            iconUrl={shiny}
            id="idVisualBrightness"
          />
          <Checkboxes
            name="Intensité"
            checks={intensityChecks}
            ids={intensityId}
            iconUrl={intensity}
            id="idVisualIntensity"
          />
          <Checkboxes
            name="Larmes"
            checks={tearsChecks}
            ids={tearsId}
            iconUrl={drop}
            id="idVisualTears"
          />
        </div>
        <ButtonPrimary type="submit" onClick={handleNavigate}>
          Etape suivante
        </ButtonPrimary>
        {/* </form> */}
      </div>
    </div>
  );
}

export default VisualStage2;
