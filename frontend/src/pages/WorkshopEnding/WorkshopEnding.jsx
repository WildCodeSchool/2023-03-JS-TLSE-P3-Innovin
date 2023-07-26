import "./WorkshopEnding.scss";

function WorkshopEnding() {
  // -------------------------------------------return the component----------------------------------------------------

  return (
    <div className="WorkshopEnding_container">
      <div className="WorkshopEnding_Content">
        <div className="intro">
          <h3 className="subtitle">Merci pour votre participation !</h3>
          <p>
            Merci d'avoir participé à cet atelier. Nous espérons vous revoir
            très prochainement.
            <br />
          </p>
        </div>
        <div className="WorkshopEnding_winecontent">
          <div className="WorkshopEnding_textWineContainer" />
        </div>
      </div>
    </div>
  );
}

export default WorkshopEnding;
