import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputTextarea } from "primereact/inputtextarea";
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
    setNewWineId,
    setExistingWineByTastingNote,
    workshopSelectedWines,
  } = CreationWorkshopValue;
  const navigate = useNavigate();
  const [isLoaded, setIsloaded] = useState(false);
  const [form, setForm] = useState({
    commentary: "",
  });

  // ------------------------------Function to get commentary of the new wine-------------------------------------------------------------
  const handleCommentaryChange = (e) => {
    setForm({ ...form, commentary: e.target.value });
  };

  // ------------------------------Fetch to get the new wine Id-------------------------------------------------------------------
  const getIdNewWine = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/newwinecreated`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setNewWineId(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getIdNewWine();
  }, []);

  // ------------------------------Fetch to get the existing wines used before to make dosage-------------------------------------------------------------------
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

  // -----------------------------------------Fetch functions for buttons--------------------------------------------------
  const handlePostSelectedWines = () => {
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
        })
        .catch((err) => {
          console.error(err);
        });
      return null; // Ajoute un retour de valeur pour chaque élément du tableau
    });
  };
  // ------------------------------Function that sends the comment on the new wine and navigate to Ending page----------------------------------------------------

  const handleNavigateAndCommentaryNewWine = () => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/newwinecommentary/2`, form, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.info(res);
        navigate("/blendedwine");
      })
      .catch((err) => {
        console.error(err);
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
            <Sliders />
            <div className="commentary_container">
              <span className="TextWine">
                Donnez votre avis sur votre vin :
              </span>
              <InputTextarea
                name="commentary"
                placeholder="Write a review about your workshop"
                autoResize
                value={form.Commentary}
                id="commentaryWine"
                onChange={handleCommentaryChange}
                rows={5}
                cols={30}
              />
            </div>
          </div>
          <ButtonPrimary
            onClick={
              (handlePostSelectedWines, handleNavigateAndCommentaryNewWine)
            }
          >
            Etape suivante
          </ButtonPrimary>
        </div>
      </div>
    )
  );
}

export default CreationWorkshop;
