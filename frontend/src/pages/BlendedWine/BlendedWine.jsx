import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreationWorkshopContext from "../../contexts/CreationWorkshopContext";
import AuthContext from "../../contexts/AuthContext";
import ButtonPrimary from "../../components/ButtonPrimary";
import "./BlendedWine.scss";

function BlendedWine() {
  const CreationWorkshopValue = useContext(CreationWorkshopContext);
  const { userToken, AuthValue } = useContext(AuthContext);
  const { blendedWine, setBlendedWine } = CreationWorkshopValue;
  const { user } = AuthValue;
  const navigate = useNavigate();
  const [isLoaded, setIsloaded] = useState(false);

  const getBlendedWine = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/newwinebyuser/${
          user.id
        }?idworkshop=1`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
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
  }, []);

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
              Félicitations, vous avez réussi à assembler votre vin ! Voici un
              résumé global de votre atelier.
              <br />
            </p>
          </div>
          <div className="BlendedWine_winecontent">
            <p>Couleur du vin :{blendedWine[0].color}</p>
            <p>
              Dosages <br />
              {blendedWine[0].vintage[0]} : {blendedWine[0].dosage[0]}
              <br />
              {blendedWine[0].vintage[1]} : {blendedWine[0].dosage[1]}
              <br />
              {blendedWine[0].vintage[2]} : {blendedWine[0].dosage[2]}
              <br />
            </p>
            <p>Votre appréciation : {blendedWine[0].commentary_wine}</p>
            <p>
              Atelier du {blendedWine[0].datetime} à {blendedWine[0].place}{" "}
            </p>
          </div>
          <ButtonPrimary onClick={handleNavigate}>Etape finale</ButtonPrimary>
        </div>
      </div>
    )
  );
}

export default BlendedWine;
