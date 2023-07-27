import "./WorkshopEnding.scss";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function WorkshopEnding() {
  // -------------------------------------------return the component----------------------------------------------------

  return (
    <div>
      <Navbar />
      <div className="WorkshopEndingContainer">
        <div className="WorkshopEndingContent">
          <div className="textEnding">
            <h3 className="h3Ending">INOVIN</h3>
            <p className="subtitleEnding">
              vous remercie d'avoir participé à cet atelier !
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WorkshopEnding;
