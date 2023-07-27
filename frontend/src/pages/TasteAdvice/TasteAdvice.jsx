import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { rating, wineQuality } from "../../Utils";
import Dropdown from "../../components/Dropdown/Dropdown";
import StepsHeader from "../../components/StepsHeader/StepsHeader";
import TastingHeaderTitle from "../../components/TastingHeaderTitle";
import "./TasteAdvice.scss";
import TastingNoteContext from "../../contexts/TastingNoteContext";
import AuthContext from "../../contexts/AuthContext";
import ButtonPrimary from "../../components/ButtonPrimary";
import TastingContext from "../../contexts/TastingContext";

function TasteAdvice() {
  const {
    setTastingNote,
    tastingNote,
    olfactorySelectedAromas,
    flavorSelectedAromas,
  } = useContext(TastingNoteContext);
  const {
    ExistingWinesIds,
    workshopHasExistingWine,
    wineNumber,
    setWineNumber,
    setTastingNotesId,
  } = useContext(TastingContext);
  const { userToken } = useContext(AuthContext);
  const indexOfWine = wineNumber - 1;

  const [rateValue, setRateValue] = useState(null);

  // -------------------------------------------------Functions------------------------------------------------------------
  const handleChange = (e) => {
    setTastingNote({
      ...tastingNote,
      tastingCommentary: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  // Submit the tastingNote object and post the ids of the tastingnotehasexistingwine table in db
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/tastingnote`,
        tastingNote,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const tastingNoteId = response.data.insertId;
      setTastingNotesId(tastingNoteId);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/tastingnotehasexistingwine`,
        {
          id_tasting_note: tastingNoteId,
          id_existing_wine: ExistingWinesIds[indexOfWine],
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // Handle olfactive and flavor data
      await Promise.all([
        ...olfactorySelectedAromas.map((olfactiveAromaId) => {
          return axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/olfactivearomashastastingnote`,
            {
              id_tasting_note: tastingNoteId,
              id_olfactive: olfactiveAromaId,
            },
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
        }),
        ...flavorSelectedAromas.map((tasteFlavorId) => {
          return axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/tastingnotehastasteflavor`,
            {
              id_tasting_note: tastingNoteId,
              id_taste_flavor: tasteFlavorId,
            },
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
        }),
      ]);

      console.info("Tasting data submitted successfully!");
    } catch (error) {
      console.error("Error submitting tasting data:", error);
    }
  };

  // -------------------------------------------------Render------------------------------------------------------------
  return (
    <div className="tasteAdvice">
      <div className="tasteAdviceContainer">
        <div className="header">
          <TastingHeaderTitle />
          <StepsHeader />
        </div>
        <div className="intro">
          <h3 className="subtitle">Votre avis sur cette dégustation</h3>
          <div className="adviceText">
            <p>Félicitations! Vous avez terminé cette dégustation.</p>
            <p>
              Comment qualifieriez-vous ce vin? <br /> Quelle est votre
              impression générale?
            </p>
          </div>
        </div>
        <div className="adviceInputs">
          <Dropdown
            id="wineQuality"
            options={wineQuality}
            name="wineQuality"
            object={tastingNote}
            setObject={setTastingNote}
          />
          <div className="commentArea">
            <label htmlFor="adviceCommentary">Commentaire</label>
            <textarea
              name="adviceCommentary"
              id="adviceCommentary"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="ratingContent">
            <p>Notez votre expérience</p>
            <div className="stars">
              {rating.map((star) => {
                const isClicked = star.value <= rateValue;

                return (
                  <button
                    key={star.id}
                    className={`${isClicked && "clicked"}`}
                    type="button"
                    onClick={() => {
                      setRateValue(star.value);
                      setTastingNote({
                        ...tastingNote,
                        rating: star.value,
                      });
                    }}
                  >
                    <i className="fi fi-sr-star" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {wineNumber < workshopHasExistingWine.length ? (
          <ButtonPrimary
            onClick={() => {
              handleNavigate("/eye/stage1");
              handleSubmit();
              setWineNumber(wineNumber + 1);
            }}
          >
            Vin suivant
          </ButtonPrimary>
        ) : (
          <ButtonPrimary
            onClick={() => {
              handleNavigate("/selection");
              handleSubmit();
            }}
          >
            Sélection des cépages
          </ButtonPrimary>
        )}
      </div>
    </div>
  );
}

export default TasteAdvice;
