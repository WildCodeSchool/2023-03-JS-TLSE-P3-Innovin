import { useContext } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import Navbar from "../../components/Navbar/Navbar";
import StepsHeader from "../../components/StepsHeader/StepsHeader";
import TastingHeaderTitle from "../../components/TastingHeaderTitle";
import "./TasteAdvice.css";
import TastingNoteContext from "../../contexts/TastingNoteContext";

function TasteAdvice() {
  const tastingNoteValue = useContext(TastingNoteContext);
  const { setTastingNote, tastingNote } = tastingNoteValue;

  const wineQuality = [
    "Parfait",
    "Excellent",
    "Trés bon",
    "Bon",
    "Passable",
    "Pas terrible",
    "Mauvais",
  ];

  return (
    <div>
      <Navbar />
      <div className="header">
        {" "}
        <TastingHeaderTitle />
        <StepsHeader />
      </div>
      <div className="intro">
        <h3 className="subtitle">Votre avis sur cette dégustation</h3>
        <p>Félicitations! Vous avez terminé cette dégustation.</p>
        <p>
          Comment qualifieriez-vous ce vin? <br /> Quelle est votre impression
          générale?
        </p>
      </div>
      <div className="inputs">
        <Dropdown
          id="wineQuality"
          options={wineQuality}
          tastingNote={tastingNote}
          setTastingNote={setTastingNote}
        />
        <div className="input">
          <label htmlFor="commentary">Commentary</label>
          <input type="text" id="commentary" />
        </div>
      </div>
    </div>
  );
}

export default TasteAdvice;
