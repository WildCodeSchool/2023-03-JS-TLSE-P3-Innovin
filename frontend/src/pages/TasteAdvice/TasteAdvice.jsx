import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { rating, wineQuality } from "../../Utils";
import Dropdown from "../../components/Dropdown/Dropdown";
import Navbar from "../../components/Navbar/Navbar";
import StepsHeader from "../../components/StepsHeader/StepsHeader";
import TastingHeaderTitle from "../../components/TastingHeaderTitle";
import "./TasteAdvice.scss";
import TastingNoteContext from "../../contexts/TastingNoteContext";
import AuthContext from "../../contexts/AuthContext";
import ButtonPrimary from "../../components/ButtonPrimary";

function TasteAdvice() {
  const { setTastingNote, tastingNote } = useContext(TastingNoteContext);
  const { userToken } = useContext(AuthContext);

  const [rateValue, setRateValue] = useState(null);
  const handleChange = (e) => {
    setTastingNote({
      ...tastingNote,
      tastingCommentary: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/selection");
  };

  const handleSubmit = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/tastingnote`, tastingNote, {
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

  return (
    <div className="tasteAdvice">
      <Navbar />{" "}
      <div className="tasteAdviceContainer">
        <div className="header">
          {" "}
          <TastingHeaderTitle />
          <StepsHeader />
        </div>
        <div className="intro">
          <h3 className="subtitle">Votre avis sur cette dégustation</h3>
          <div className="adviceText">
            {" "}
            <p>Félicitations! Vous avez terminé cette dégustation.</p>
            <p>
              Comment qualifieriez-vous ce vin? <br /> Quelle est votre
              impression générale?
            </p>
          </div>
        </div>
        <div className="inputs">
          <Dropdown id="wineQuality" options={wineQuality} />
          <div className="commentArea">
            <label htmlFor="commentary">Commentary</label>
            <textarea
              name="commentary"
              id="commentary"
              onChange={(e) => handleChange(e)}
            />
          </div>
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
        <ButtonPrimary
          onClick={() => {
            handleNavigate();
            handleSubmit();
          }}
        >
          Sélection des cépages
        </ButtonPrimary>
      </div>
    </div>
  );
}

export default TasteAdvice;
