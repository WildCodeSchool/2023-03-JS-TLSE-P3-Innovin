import "./TastingHeaderTitle.css";

function TastingHeaderTitle() {
  // create a useState count to increment the wineNumber once a TastingNote is completed
  // date must be dynamic with a fetch of workshop table
  // const [wineNumber, setWineNumber] = useState(1);

  return (
    <div className="titleContainer">
      <h2>
        Vin N° <span>1</span>
      </h2>
      <p>date</p>
    </div>
  );
}

export default TastingHeaderTitle;
