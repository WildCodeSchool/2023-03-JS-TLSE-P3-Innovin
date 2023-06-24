import { useState } from "react";
import "./VisualStage1.css";
import raspberry from "../../assets/Red_Wine_Colors/Framboise.png";
import cherry from "../../assets/Red_Wine_Colors/Cerise.png";
import garnet from "../../assets/Red_Wine_Colors/Grenat.png";
import purple from "../../assets/Red_Wine_Colors/Pourpre.png";
import redBlack from "../../assets/Red_Wine_Colors/Rouge_Noir.png";
import ruby from "../../assets/Red_Wine_Colors/Rubis.png";
import tiled from "../../assets/Red_Wine_Colors/Tuilé.png";
import violet from "../../assets/Red_Wine_Colors/Violet.png";
import ButtonPrimary from "../../components/ButtonPrimary";
import StepsHeader from "../../components/StepsHeader/StepsHeader";
import TastingHeaderTitle from "../../components/TastingHeaderTitle";

function VisualStage1() {
  const [selectedButton, setSelectedButton] = useState(null);

  const redWineColors = [
    {
      id: 1,
      colorName: "Raspberry",
      color: "#E94E65",
      blotch: raspberry,
    },
    {
      id: 2,
      colorName: "Cherry",
      color: "#D93D3B",
      blotch: cherry,
    },
    {
      id: 3,
      colorName: "Ruby",
      color: "#B91C19",
      blotch: ruby,
    },
    {
      id: 4,
      colorName: "Purple",
      color: "#9A1F49",
      blotch: purple,
    },
    {
      id: 5,
      colorName: "Violet",
      color: "#8E1665",
      blotch: violet,
    },
    {
      id: 6,
      colorName: "Garnet",
      color: "#743651",
      blotch: garnet,
    },
    {
      id: 7,
      colorName: "Red Black",
      color: "#5E2C42",
      blotch: redBlack,
    },
    {
      id: 8,
      colorName: "Tiled",
      color: "#91412F",
      blotch: tiled,
    },
  ];

  const handleClick = (index) => {
    setSelectedButton(index);
  };

  return (
    <div className="visualStage1">
      <div className="contentStage1">
        {" "}
        <TastingHeaderTitle />
        <StepsHeader />
        <div className="intro">
          <h3 className="subtitle">J'observe sa teinte</h3>
          <p>
            Placez votre verre à la lumière du jour en le posant sur une surface
            blanche et observez son disque. A quelle teinte correspond votre vin
            ?
          </p>
          <p className="tip">
            A Savoir : La couleur du vin vous donne une indication sur son
            vieillissement. Sur cette palette, les couleurs sont classées du
            plus jeune au plus vieux.
          </p>
        </div>
        <div className="colors">
          {redWineColors.map((el, index) => (
            <button
              key={el.id}
              type="button"
              onClick={() => handleClick(index)}
              className="blotch"
            >
              {" "}
              <img src={el.blotch} alt="wine color" />
              <p className={selectedButton === index ? "colorName" : ""}>
                {el.colorName}
              </p>
            </button>
          ))}
        </div>
        <ButtonPrimary>Etape suivante</ButtonPrimary>
      </div>
    </div>
  );
}

export default VisualStage1;
