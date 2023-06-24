import "./TastingHeaderTitle.css";

function TastingHeaderTitle() {
  // create a useState count to increment the wineNumber once a TastingNote is completed
  //   const [wineNumber, setWineNumber] = useState(1);

  return (
    <div className="header">
      <h2>
        Vin N° <span>1</span>
      </h2>
      <p>date</p>
    </div>
  );
}

export default TastingHeaderTitle;
