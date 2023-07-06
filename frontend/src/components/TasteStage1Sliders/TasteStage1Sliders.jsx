/* eslint-disable camelcase */
import { useState } from "react";
import PropTypes from "prop-types";
import CircularSlider from "@fseehawer/react-circular-slider";
import "./TasteStage1Sliders.css";
import Sugar_Icon from "../../assets/Icons/Sliders_Icons/Sugar_Icon.svg";
import Acidity_Icon from "../../assets/Icons/Sliders_Icons/Acidity_Icon.svg";
import WineBarrel_Icon from "../../assets/Icons/Sliders_Icons/WineBarrel_Icon.svg";
import WineGlass_Icon from "../../assets/Icons/Sliders_Icons/WineGlass_Icon.svg";

function Sliders({ tasteTannin, tasteSweetness, tasteAcidity, tasteAlcool }) {
  // Retrieval of properties to display for each object passed in props
  const tasteTanninValues = tasteTannin.map((item) => item.tannin);
  const tasteSweetnessValues = tasteSweetness.map((item) => item.sweetness);
  const acidityValues = tasteAcidity.map((item) => item.acidity);
  const alcoolValues = tasteAlcool.map((item) => item.alcool);

  const [acidityValue, setAcidityValue] = useState();
  const [alcoolValue, setAlcoolValue] = useState();
  const [sweetnessValue, setSweetnessValue] = useState("");

  const handleChangeSweetnessValue = (value) => {
    const dataSweetness = ["0 g/L", "4 g/L", "12 g/L", "32g/L", "45 g/L"];
    setSweetnessValue(tasteSweetnessValues[dataSweetness.indexOf(value)]);
  };

  const handleChangeAcidityValue = (value) => {
    const dataAcidity = ["2 g/L", "4 g/L", "5 g/L", "6 g/L", "7 g/L"];
    setAcidityValue(dataAcidity[acidityValues.indexOf(value)]);
  };

  const handleChangeAlcoolValue = (value) => {
    const dataAlcool = ["8 %", "8.5 %", "10 %", "12 %", "13.5 %"];
    setAlcoolValue(dataAlcool[alcoolValues.indexOf(value)]);
  };

  return (
    <div className="SlidersContainer">
      <div className="Sliderbox">
        <div className="TitleSliders">
          <img src={Sugar_Icon} alt="Sugar_Icon" />
          <h2>Sucrosité</h2>
        </div>
        <CircularSlider
          labelFontSize="2rem"
          valueFontSize="2.5rem"
          label={tasteSweetnessValues}
          labelColor="var(--whiteGoldColor)"
          knobColor="#892221"
          progressColorFrom="#E82321"
          progressColorTo="#E82321"
          progressSize={31}
          trackColor="#eeeeee"
          trackSize={24}
          data={sweetnessValue}
          dataIndex={2.5}
          onChange={handleChangeSweetnessValue}
        />
      </div>
      <div className="Sliderbox">
        <div className="TitleSliders">
          <img src={WineGlass_Icon} alt="WineGlass_Icon" />
          <h2>Alcool</h2>
        </div>
        <CircularSlider
          labelFontSize="2rem"
          valueFontSize="2.5rem"
          label={alcoolValue}
          labelColor="var(--whiteGoldColor)"
          knobColor="#A72438"
          progressColorFrom="#9A1F48"
          progressColorTo="#9A1F48"
          progressSize={31}
          trackColor="#eeeeee"
          trackSize={24}
          data={alcoolValues}
          dataIndex={2.5}
          onChange={handleChangeAlcoolValue}
        />
      </div>

      <div className="Sliderbox">
        <div className="TitleSliders">
          <img src={Acidity_Icon} alt="Acidity_Icon" />
          <h2>Acidité</h2>
        </div>
        <CircularSlider
          labelFontSize="2rem"
          valueFontSize="2.5rem"
          label={acidityValue}
          labelColor="var(--whiteGoldColor)"
          knobColor="#730907"
          progressColorFrom="#B91C19"
          progressColorTo="#B91C19"
          progressSize={31}
          trackColor="#eeeeee"
          trackSize={24}
          data={acidityValues}
          dataIndex={2.5}
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
          valueFontSize="2.5rem"
          label=" "
          labelColor="var(--whiteGoldColor)"
          knobColor="#892221"
          progressColorFrom="#E94E65"
          progressColorTo="#E94E65"
          progressSize={31}
          trackColor="#eeeeee"
          trackSize={24}
          data={tasteTanninValues}
          dataIndex={2.5}
          onChange={(value) => console.info(value)}
        />
      </div>
    </div>
  );
}

Sliders.propTypes = {
  tasteTannin: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    )
  ).isRequired,
  tasteSweetness: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    )
  ).isRequired,
  tasteAlcool: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    )
  ).isRequired,
  tasteAcidity: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    )
  ).isRequired,
};

export default Sliders;
