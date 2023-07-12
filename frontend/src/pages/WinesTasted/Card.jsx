import PropTypes from "prop-types";
// import TastingNoteContext from "../../contexts/TastingNoteContext";
import "./card.css";
import eye from "../../assets/Icons/Eye_Icon.svg";
import nose from "../../assets/Icons/Nose_Icon.svg";
import mouth from "../../assets/Icons/Mouth_Icon.svg";
import star from "../../assets/Icons/Star_Default_Icon.svg";

function Card({ wine }) {
  // const { setTastingNote } = useContext(TastingNoteContext);
  // const [selected, setSelected] = useState(false);

  return (
    <div className="card">
      <div className="title-card">
        <h2 className="h2-card">Vin numéro {wine.id}</h2>
        <button className="star-button" aria-label="Toggle Star" type="button">
          <img className="img-card" src={star} alt="star" />
        </button>
      </div>
      <div className="card-content">
        <div className="eye-card">
          <img className="img-card" src={eye} alt="eye" />
          <p className="p-card">
            {wine.visual_color_id} • {wine.visual_limpidity_id} •{" "}
            {wine.visual_brightness_id} • {wine.visual_intensity_id} •{" "}
            {wine.visual_tears_id}
          </p>
        </div>
        <div className="nose-card">
          <img className="img-card" src={nose} alt="nose" />
          <p className="p-card">
            {wine.id_olfactive_intensity} • {wine.olfactive_complexity_id} •{" "}
            {/* {wine.idOlfactiveAromas} */}
          </p>
        </div>
        <div className="mouth-card">
          <img className="img-card" src={mouth} alt="mouth" />
          <p className="p-card">
            {wine.taste_sweetness_id} • {wine.taste_alcohol_id} •{" "}
            {wine.acidity_id} • {wine.taste_tannin_id} •{" "}
            {wine.taste_intensity_id} • {wine.taste_mouth_feel_id}
          </p>
          <br />
        </div>{" "}
        <p className="commentary"> Commentaire : {wine.tasting_commentary}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  wine: PropTypes.shape({
    tasting_commentary: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    visual_color_id: PropTypes.number.isRequired,
    visual_limpidity_id: PropTypes.number.isRequired,
    visual_brightness_id: PropTypes.number.isRequired,
    visual_intensity_id: PropTypes.number.isRequired,
    visual_tears_id: PropTypes.number.isRequired,
    olfactive_complexity_id: PropTypes.number.isRequired,
    id_olfactive_intensity: PropTypes.number.isRequired,
    // idOlfactiveAromas: PropTypes.string.isRequired,
    taste_sweetness_id: PropTypes.number.isRequired,
    taste_alcohol_id: PropTypes.number.isRequired,
    acidity_id: PropTypes.number.isRequired,
    taste_tannin_id: PropTypes.number.isRequired,
    taste_intensity_id: PropTypes.number.isRequired,
    taste_mouth_feel_id: PropTypes.number.isRequired,
  }).isRequired,
  // isSelected: PropTypes.bool.isRequired,
  // number: PropTypes.number.isRequired,
  // onSelect: PropTypes.func.isRequired,
};

export default Card;
