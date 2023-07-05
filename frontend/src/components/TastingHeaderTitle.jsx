import { useContext } from "react";
import TastingContext from "../contexts/TastingContext";
import "./TastingHeaderTitle.css";

function TastingHeaderTitle() {
  const { wineNumber } = useContext(TastingContext);

  return (
    <div className="titleContainer">
      <h2 className="wineNumTitle">
        Vin N° <span>{wineNumber}</span>
      </h2>
      <p className="headerDate">date</p>
    </div>
  );
}

export default TastingHeaderTitle;
