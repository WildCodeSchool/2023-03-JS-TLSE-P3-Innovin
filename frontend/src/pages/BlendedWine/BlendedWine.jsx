import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import CreationWorkshopContext from "../../contexts/CreationWorkshopContext";
import AuthContext from "../../contexts/AuthContext";
import ButtonPrimary from "../../components/ButtonPrimary";
import Wineworkshop from "../../assets/Wine_Img/Wineworkshop.jpg";
import "./BlendedWine.scss";

function BlendedWine() {
  const CreationWorkshopValue = useContext(CreationWorkshopContext);
  const { userToken } = useContext(AuthContext);
  const { blendedWine, setBlendedWine, newWineId } = CreationWorkshopValue;
  const navigate = useNavigate();
  const [isLoaded, setIsloaded] = useState(false);

  const getBlendedWine = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/newwine/${newWineId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setBlendedWine(res.data);
        setIsloaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getBlendedWine();
  }, [userToken]);

  // -----------------------------------------To format date--------------------------------------------------

  function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const formattedDate = format(dateObj, "dd/MM/yyyy 'à' HH:mm");
    return formattedDate;
  }

  let originalDateString = "";
  let formattedDate = "";

  if (blendedWine && blendedWine[0]) {
    originalDateString = blendedWine[0].datetime;
    formattedDate = formatDate(originalDateString);
  }

  // -----------------------------------------handle functions for buttons--------------------------------------------------

  const handleNavigate = () => {
    navigate("/ending");
  };

  // -------------------------------------------return the component----------------------------------------------------

  return (
    isLoaded && (
      <div className="BlendedWine_container">
        <div className="BlendedWine_Content">
          <div className="intro">
            <h3 className="subtitle">Assemblez votre propre vin</h3>
            <p>
              Félicitations, vous avez terminé l'assemblage votre vin ! Voici un
              résumé global de votre parcours.
              <br />
            </p>
          </div>
          <div className="BlendedWine_winecontent">
            <div className="BlendedWine_imgWineContainer">
              <h2>
                Atelier du {formattedDate} à {blendedWine[0].place}
              </h2>
              <img src={Wineworkshop} alt="vin" />
            </div>
            <div className="BlendedWine_textWineContainer">
              <p>
                <span className="TextWine">Couleur du vin :</span>{" "}
                {blendedWine[0].color}
                <br />
              </p>
              <ul>
                <span className="TextWine">Dosages :</span> <br /> <br />
                <li>
                  {blendedWine[0].grapeVariety[0]} : {blendedWine[0].dosage[0]}{" "}
                  ml
                </li>
                <li>
                  {blendedWine[0].grapeVariety[1]} : {blendedWine[0].dosage[1]}{" "}
                  ml
                </li>
                <li>
                  {blendedWine[0].grapeVariety[2]} : {blendedWine[0].dosage[2]}{" "}
                  ml
                </li>
              </ul>
              <p>
                <span className="TextWine">Votre appréciation :</span>
                <br />
                {blendedWine[0].commentaryWine}
              </p>
            </div>
          </div>
          <ButtonPrimary onClick={handleNavigate}>Etape finale</ButtonPrimary>
        </div>
      </div>
    )
  );
}

export default BlendedWine;
