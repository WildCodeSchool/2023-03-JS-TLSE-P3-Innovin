import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreationWorkshopContext from "../../contexts/CreationWorkshopContext";
// import TastingNoteContext from "../../contexts/TastingNoteContext";
import AuthContext from "../../contexts/AuthContext";
import ButtonPrimary from "../../components/ButtonPrimary";
import "./BlendedWine.scss";

function BlendedWine() {
  const CreationWorkshopValue = useContext(CreationWorkshopContext);
  // const tastingNoteValue = useContext(TastingNoteContext);
  const userToken = useContext(AuthContext);
  const { blendedWine, setBlendedWine } = CreationWorkshopValue;
  // const { idUser } = tastingNoteValue;
  const navigate = useNavigate();
  const [isLoaded, setIsloaded] = useState(false);

  const getBlendedWine = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/newwinebyuser/1?idworkshop=2`, // ${idUser}?idworkshop=${idWorkshop}`
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
            <p>{blendedWine[0].color}</p>
          </div>
          <ButtonPrimary onClick={handleNavigate}>Etape finale</ButtonPrimary>
        </div>
      </div>
    )
  );
}

export default BlendedWine;
