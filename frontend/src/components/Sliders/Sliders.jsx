/* eslint-disable camelcase */

import CircularSlider from "@fseehawer/react-circular-slider";
import "./Sliders.scss";
import Glass_Wine_Icon1 from "../../assets/Icons/Glass_Wine_Icon1.svg";

function Sliders() {
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

export default Sliders;
