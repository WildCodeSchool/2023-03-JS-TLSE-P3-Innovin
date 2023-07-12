/* eslint-disable camelcase */
// import { useContext, useState } from "react";
// import PropTypes from "prop-types";
import CircularSlider from "@fseehawer/react-circular-slider";
// import TastingNoteContext from "../../contexts/TastingNoteContext";
import "./Sliders.scss";
import Glass_Wine_Icon1 from "../../assets/Icons/Glass_Wine_Icon1.svg";

function Sliders() {
  // ------------------------------------Retrieval of properties to display for each object passed in props--------------------------------------------------
  /*
  const tasteSweetnessItems = dataSweetness.map((item) => item.sweetness);
  const acidityItems = dataAcidity.map((item) => item.acidity);
  const alcoholItems = dataAlcohol.map((item) => item.alcohol);
  const tasteTanninItems = dataTasteTannin.map((item) => item.taste_tannin); */

  // ------------------------------------Slider values management-------------------------------------------------------------------------------------------
  /*
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
*/

  const data = [1, 2, 3, 4, 5, 6];
  return (
    <div className="Sliderbox">
      <div className="TitleSliders">
        <img src={Glass_Wine_Icon1} alt="Sugar_Icon" />
        <h2>Title</h2>
      </div>
      <CircularSlider
        labelFontSize="2.5rem"
        valueFontSize="2rem"
        label="Data label"
        labelColor="var(--whiteGoldColor)"
        knobColor="#892221"
        progressColorFrom="#E82321"
        progressColorTo="#E82321"
        progressSize={28}
        trackColor="#eeeeee"
        trackSize={23}
        data={data}
        dataIndex={2.5}
        verticalOffset="-0.1rem"
        onChange={(value) => {
          console.info(value);
        }}
      />
    </div>
  );
}

/*
Sliders.propTypes = {
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
}; */

export default Sliders;
