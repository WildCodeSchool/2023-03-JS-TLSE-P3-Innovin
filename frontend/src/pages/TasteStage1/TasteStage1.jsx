import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import StepsHeader from "../../components/StepsHeader/StepsHeader";
import TastingHeaderTitle from "../../components/TastingHeaderTitle";
import SlidersTasteStage1 from "../../components/TasteStage1Sliders/TasteStage1Sliders";
import "./TasteStage1.css";

function TasteStage1() {
  const navigate = useNavigate();

  const tasteTannin = [
    { id: 1, tannin: "Apre" },
    { id: 2, tannin: "Chargé" },
    { id: 3, tannin: "Charpenté" },
    { id: 4, tannin: "Fondu" },
    { id: 5, tannin: "Lisse" },
  ];
  const tasteSweetness = [
    { id: 1, sweetness: "Sirupeux" },
    { id: 2, sweetness: "Liquoreux" },
    { id: 3, sweetness: "Moelleux" },
    { id: 4, sweetness: "Doux" },
    { id: 5, sweetness: "Sec" },
  ];

  const tasteAcidity = [
    { id: 1, acidity: "Nerveuse" },
    { id: 2, acidity: "Pointue" },
    { id: 3, acidity: "Vive" },
    { id: 4, acidity: "Fraîche" },
    { id: 5, acidity: "Molle" },
  ];

  const tasteAlcool = [
    { id: 1, alcool: "Alcooleux" },
    { id: 2, alcool: "Capiteux" },
    { id: 3, alcool: "Gras" },
    { id: 4, alcool: "Généreux" },
    { id: 5, alcool: "Faible" },
  ];

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
          <p>
            Mettez votre vin en bouche et “grumez-le” délicatement en aspirant
            un peu d’air entre vos lèvres.
            <br />{" "}
          </p>
          <p>Comment est-il structuré ? </p>
        </div>
        <form action="" className="FormTasteStage1">
          <SlidersTasteStage1
            tasteTannin={tasteTannin}
            tasteSweetness={tasteSweetness}
            tasteAcidity={tasteAcidity}
            tasteAlcool={tasteAlcool}
          />
        </form>
        <ButtonPrimary type="submit" onClick={handleNavigate}>
          Etape suivante
        </ButtonPrimary>
      </div>
    </div>
  );
}
export default TasteStage1;
