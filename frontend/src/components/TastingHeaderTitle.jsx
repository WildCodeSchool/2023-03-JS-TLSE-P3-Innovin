import { useContext } from "react";
import { format } from "date-fns";
import CreationWorkshopContext from "../contexts/CreationWorkshopContext";
import TastingContext from "../contexts/TastingContext";
import "./TastingHeaderTitle.scss";

function TastingHeaderTitle() {
  const CreationWorkshopValue = useContext(CreationWorkshopContext);
  const { nextWorkshops } = CreationWorkshopValue;
  const { wineNumber } = useContext(TastingContext);

  // -----------------------------------------To format date--------------------------------------------------

  function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const formattedDate = format(dateObj, "dd/MM/yyyy 'à' HH:mm");
    return formattedDate;
  }

  let originalDateString = "";
  let formattedDate = "";

  if (nextWorkshops && nextWorkshops[0]) {
    originalDateString = nextWorkshops[0].datetime;
    formattedDate = formatDate(originalDateString);
  }

  return (
    <div className="titleContainer">
      <h2 className="wineNumTitle">Vin N° {wineNumber}</h2>
      <p className="headerDate">{formattedDate}</p>
    </div>
  );
}

export default TastingHeaderTitle;
