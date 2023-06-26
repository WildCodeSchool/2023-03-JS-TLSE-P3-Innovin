import { useNavigate } from "react-router-dom";
import { checkboxes } from "../../Utils";
import ButtonPrimary from "../../components/ButtonPrimary";
import StepsHeader from "../../components/StepsHeader/StepsHeader";
import TastingHeaderTitle from "../../components/TastingHeaderTitle";
import Checkboxes from "../../components/Checkboxes/Checkboxes";
import "./VisualStage2.css";

function VisualStage2() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/nose/stage1");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.info(formJson);
  };

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
        <form action="" className="formStage2" onSubmit={handleSubmit}>
          <div className="checkboxes">
            {checkboxes.map((card) => (
              <Checkboxes key={card.id} card={card} />
            ))}
          </div>
          <ButtonPrimary type="submit" onClick={handleNavigate}>
            Etape suivante
          </ButtonPrimary>
        </form>
      </div>
    </div>
  );
}

export default VisualStage2;
