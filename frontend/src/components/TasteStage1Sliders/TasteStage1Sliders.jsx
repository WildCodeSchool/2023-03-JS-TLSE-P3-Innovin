/* eslint-disable camelcase */
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import CircularSlider from "@fseehawer/react-circular-slider";
import TastingNoteContext from "../../contexts/TastingNoteContext";
import "./TasteStage1Sliders.scss";
import Sugar_Icon from "../../assets/Icons/Sliders_Icons/Sugar_Icon.svg";
import Acidity_Icon from "../../assets/Icons/Sliders_Icons/Acidity_Icon.svg";
import WineBarrel_Icon from "../../assets/Icons/Sliders_Icons/WineBarrel_Icon.svg";
import WineGlass_Icon from "../../assets/Icons/Sliders_Icons/WineGlass_Icon.svg";

function SlidersTasteStage1({
  dataTasteTannin,
  dataAlcohol,
  dataAcidity,
  dataSweetness,
}) {
  const tastingNoteValue = useContext(TastingNoteContext);
  const { setIdTasteSweetnessValue } = tastingNoteValue;
  const { setIdAcidityValue } = tastingNoteValue;
  const { setIdTasteAlcoholValue } = tastingNoteValue;
  const { setIdTasteTanninValue } = tastingNoteValue;

  // ------------------------------------Retrieval of properties to display for each object passed in props--------------------------------------------------

  const tasteSweetnessItems = dataSweetness.map((item) => item.sweetness);
  const acidityItems = dataAcidity.map((item) => item.acidity);
  const alcoholItems = dataAlcohol.map((item) => item.alcohol);
  const tasteTanninItems = dataTasteTannin.map((item) => item.taste_tannin);

  // ------------------------------------Slider values management-------------------------------------------------------------------------------------------

  const [acidityValue, setAcidityValue] = useState();
  const [alcoholValue, setAlcoholValue] = useState();
  const [sweetnessValue, setSweetnessValue] = useState();
  const [tasteTanninValue, setTasteTanninValue] = useState();
  const sliderDataSweetness = ["2 g/L", "4 g/L", "12 g/L", "32g/L", "45 g/L"];
  const sliderDataAcidity = ["2 g/L", "4 g/L", "5 g/L", "6 g/L", "7 g/L"];
  const sliderDataAlcohol = ["8 %", "8.5 %", "10 %", "12 %", "13.5 %"];
  const sliderDataTasteTannin = [1, 2, 3, 4, 5];
  const handleChangeSweetnessValue = (value) => {
    setSweetnessValue(tasteSweetnessItems[sliderDataSweetness.indexOf(value)]);
    setIdTasteSweetnessValue(sliderDataSweetness.indexOf(value) + 1);
  };

  const handleChangeAcidityValue = (value) => {
    setAcidityValue(acidityItems[sliderDataAcidity.indexOf(value)]);
    setIdAcidityValue(sliderDataAcidity.indexOf(value) + 1);
  };

  const handleChangeAlcoholValue = (value) => {
    setAlcoholValue(alcoholItems[sliderDataAlcohol.indexOf(value)]);
    setIdTasteAlcoholValue(sliderDataAlcohol.indexOf(value) + 1);
  };

  const handleChangeTasteTanninValue = (value) => {
    setTasteTanninValue(tasteTanninItems[sliderDataTasteTannin.indexOf(value)]);
    setIdTasteTanninValue(sliderDataTasteTannin.indexOf(value) + 1);
  };

  return (
    <div className="SlidersContainer">
      <div className="Sliderbox">
        <div className="TitleSliders">
          <img src={Sugar_Icon} alt="Sugar_Icon" />
          <h2>Sucrosité</h2>
        </div>
        <CircularSlider
          labelFontSize="2.5rem"
          valueFontSize="2rem"
          label={
            sweetnessValue ||
            tasteSweetnessItems[sliderDataSweetness.indexOf("12 g/L")] // Displays the value of 'sweetnessValue' if true or the element corresponding to "12g/L"
          }
          labelColor="var(--whiteGoldColor)"
          knobColor="#892221"
          progressColorFrom="#E82321"
          progressColorTo="#E82321"
          progressSize={28}
          trackColor="#eeeeee"
          trackSize={23}
          data={sliderDataSweetness}
          dataIndex={2.5}
          verticalOffset="-0.1rem"
          onChange={handleChangeSweetnessValue}
        />
      </div>
      <div className="Sliderbox">
        <div className="TitleSliders">
          <img src={WineGlass_Icon} alt="WineGlass_Icon" />
          <h2>Alcool</h2>
        </div>
        <CircularSlider
          labelFontSize="2.5rem"
          valueFontSize="2rem"
          label={
            alcoholValue || alcoholItems[sliderDataAlcohol.indexOf("10 %")] // Displays the value of 'alcoholValue' if true or the element corresponding to "10%"
          }
          labelColor="var(--whiteGoldColor)"
          knobColor="#A72438"
          progressColorFrom="#9A1F48"
          progressColorTo="#9A1F48"
          progressSize={28}
          trackColor="#eeeeee"
          trackSize={23}
          data={sliderDataAlcohol}
          dataIndex={2.5}
          verticalOffset="-0.1rem"
          onChange={handleChangeAlcoholValue}
        />
      </div>

      <div className="Sliderbox">
        <div className="TitleSliders">
          <img src={Acidity_Icon} alt="Acidity_Icon" />
          <h2>Acidité</h2>
        </div>
        <CircularSlider
          labelFontSize="2.5rem"
          valueFontSize="2rem"
          label={
            acidityValue || acidityItems[sliderDataAcidity.indexOf("5 g/L")] // Displays the value of 'acidityValue' if true or the element corresponding to "5 g/L"
          }
          labelColor="var(--whiteGoldColor)"
          knobColor="#730907"
          progressColorFrom="#B91C19"
          progressColorTo="#B91C19"
          progressSize={28}
          trackColor="#eeeeee"
          trackSize={23}
          data={sliderDataAcidity}
          dataIndex={2.5}
          verticalOffset="-0.1rem"
          onChange={handleChangeAcidityValue}
        />
      </div>
      <div className="Sliderbox">
        <div className="TitleSliders">
          <img src={WineBarrel_Icon} alt="WineBarrel Icon" />
          <h2>Tanin</h2>
        </div>
        <CircularSlider
          labelFontSize="2rem"
          valueFontSize="0rem"
          label={
            tasteTanninValue ||
            tasteTanninItems[sliderDataTasteTannin.indexOf(3)]
          }
          labelColor="var(--whiteGoldColor)"
          knobColor="#892221"
          progressColorFrom="#E94E65"
          progressColorTo="#E94E65"
          progressSize={28}
          trackColor="#eeeeee"
          trackSize={23}
          data={sliderDataTasteTannin}
          dataIndex={2.5}
          verticalOffset="-2rem"
          onChange={handleChangeTasteTanninValue}
        />
      </div>
    </div>
  );
}

SlidersTasteStage1.propTypes = {
  dataTasteTannin: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    )
  ).isRequired,
  dataSweetness: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    )
  ).isRequired,
  dataAlcohol: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    )
  ).isRequired,
  dataAcidity: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    )
  ).isRequired,
};

export default SlidersTasteStage1;
