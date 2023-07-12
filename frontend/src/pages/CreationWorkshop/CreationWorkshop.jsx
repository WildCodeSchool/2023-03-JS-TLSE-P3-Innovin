import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import Sliders from "../../components/Sliders/Sliders";
import "./CreationWorkshop.scss";

function CreationWorkshop() {
  const navigate = useNavigate();

  // -----------------------------------------handle functions for buttons--------------------------------------------------

  const handleNavigate = () => {
    navigate("/ending");
  };

  // -------------------------------------------return the component----------------------------------------------------

  return (
    <div className="workshop_container">
      <div className="workshop_Content">
        <div className="intro">
          <h3 className="subtitle">Assemblez votre propre vin</h3>
          <p>
            Utilisez maintenant les éléments ci-dessous pour réaliser un
            assemblage en dosant chacun des vins précédemment sélectionnés.
            <br />{" "}
          </p>
        </div>
        <div className="workshop_Sliderbox">
          <Sliders />
        </div>
        <ButtonPrimary onClick={handleNavigate}>Etape finale</ButtonPrimary>
      </div>
    </div>
  );
}
export default CreationWorkshop;
