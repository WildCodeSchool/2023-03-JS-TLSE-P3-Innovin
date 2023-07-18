import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreationWorkshopContext from "../../contexts/CreationWorkshopContext";
import AuthContext from "../../contexts/AuthContext";
import ButtonPrimary from "../../components/ButtonPrimary";
import Sliders from "../../components/Sliders/Sliders";
import "./CreationWorkshop.scss";

function CreationWorkshop() {
  const CreationWorkshopValue = useContext(CreationWorkshopContext);
  const userToken = useContext(AuthContext);
  const {
    selectedWinesIds,
    setNewWineData,
    newWine,
    setNewWine,
    existingWineByTastingNote,
    setExistingWineByTastingNote,
    workshopSelectedWines,
    wineSelectedDosages,
    setWineSelectedDosages,
  } = CreationWorkshopValue;
  const navigate = useNavigate();

  const [isLoaded, setIsloaded] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setNewWine({ newWine: { color: "Rouge sang" } });
  };

  const postNewWine = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/newwine`, newWine, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.info(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getIdNewWine = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/newwinecreated`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setNewWineData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    postNewWine();
    getIdNewWine();
  }, [newWine]);

  const getExistingWineByTastingNoteId = () => {
    Promise.all(
      selectedWinesIds.map((tastingNoteId) =>
        axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/existingwinebytastingnote/${tastingNoteId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
      )
    )
      .then((responses) => {
        const existingWine = responses.map((res) => res.data);
        setExistingWineByTastingNote(existingWine);
        setIsloaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getExistingWineByTastingNoteId();
  }, []);

  // -----------------------------------------handle functions for buttons--------------------------------------------------
  const handleNavigateAndpostSelectedWines = () => {
    workshopSelectedWines.map((selectedWine) => {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/selectedwine`,
          selectedWine,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((res) => {
          console.info(res);
          navigate("/blendedwine");
        })
        .catch((err) => {
          console.error(err);
        });
      return null; // Ajoute un retour de valeur pour chaque élément du tableau
    });
  };

  // -------------------------------------------return the component----------------------------------------------------

  return (
    isLoaded && (
      <div className="workshop_container">
        <div className="workshop_Content">
          <div className="intro">
            <h3 className="subtitle">Assemblez votre propre vin</h3>
            <p>
              Assemblez votre vin à l'aide de vos cépages préférés. Utilisez les
              sliders ci-dessous pour inscrire vos dosages.
              <br />{" "}
            </p>
          </div>
          <div className="workshop_Sliderbox">
            <p>Quelles quantités avez-vous utilisé ?</p>
            <Sliders
              workshopSelectedWines={workshopSelectedWines}
              existingWineByTastingNote={existingWineByTastingNote}
              wineSelectedDosages={wineSelectedDosages}
              setWineSelectedDosages={setWineSelectedDosages}
            />
          </div>
          <div>
            <button type="button" onClick={handleClick}>
              POSTER
            </button>
          </div>
          <ButtonPrimary onClick={handleNavigateAndpostSelectedWines}>
            Etape suivante
          </ButtonPrimary>
        </div>
      </div>
    )
  );
}

export default CreationWorkshop;
