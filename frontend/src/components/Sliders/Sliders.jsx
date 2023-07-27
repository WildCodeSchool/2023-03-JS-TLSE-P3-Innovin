/* eslint-disable camelcase */
import { useContext, useEffect } from "react";
import InputSlider from "react-input-slider";
import CreationWorkshopContext from "../../contexts/CreationWorkshopContext";
import Grapes_Icon from "../../assets/Icons/Grapes_Icon.svg";
import "./Sliders.scss";

function Sliders() {
  const CreationWorkshopValue = useContext(CreationWorkshopContext);
  const {
    existingWineByTastingNote,
    workshopSelectedWines,
    wineSelectedDosages,
    setWineSelectedDosages,
  } = CreationWorkshopValue;
  const totalMilliliters = 250;

  // Mettre à jour les dosages locaux lors de la modification des dosages des sliders
  const updateDosage = (index, value) => {
    const newDosages = [...wineSelectedDosages];
    newDosages[index] = value;
    setWineSelectedDosages(newDosages);
  };

  // Vérifier si la somme totale des dosages dépasse la valeur de 'totalMilliliters'
  const isSumExceeded = () => {
    return (
      wineSelectedDosages.reduce(
        (accumulator, currentValue) => accumulator + (currentValue || 0),
        0
      ) > totalMilliliters
    );
  };

  // Utiliser useEffect pour arrêter les sliders lorsque la somme totale dépasse la valeur de 'totalMilliliters'
  useEffect(() => {
    if (isSumExceeded()) {
      // Calculer la somme totale des dosages
      const totalDosages = wineSelectedDosages.reduce(
        (accumulator, currentValue) => accumulator + (currentValue || 0),
        0
      );

      // Trouver l'index du slider en fonction de la taille de workshopSelectedWines
      const indexOfMaxValue = wineSelectedDosages.reduce(
        (maxIndex, currentValue, currentIndex, array) =>
          currentValue > array[maxIndex] ? currentIndex : maxIndex,
        0
      );

      // Calculer le dépassement par rapport à la valeur totale autorisée
      const exceededAmount = totalDosages - totalMilliliters;

      // Si la somme totale dépasse la valeur maximale, réduire le slider avec la valeur la plus élevée
      if (exceededAmount > 0) {
        const newDosages = [...wineSelectedDosages];
        newDosages[indexOfMaxValue] -= exceededAmount;
        setWineSelectedDosages(newDosages);
      }
    }
  }, [wineSelectedDosages]);

  return (
    <div className="sliders_container">
      {workshopSelectedWines.map(({ dosage }, index) => (
        <div key={dosage.id} className="slider-container">
          <div className="sliderHeader">
            <img src={Grapes_Icon} alt="Sugar_Icon" />
            <h2>{existingWineByTastingNote[index].grape_variety}</h2>
          </div>
          <span className="slider-value">
            {wineSelectedDosages[index] || 0} ml
          </span>
          <InputSlider
            styles={{
              active: { backgroundColor: "var( --redWineColor)" },
              thumb: {
                width: 16,
                height: 16,
              },
              track: {
                width: 260,
              },
            }}
            axis="x"
            x={wineSelectedDosages[index] || 0}
            xmax={totalMilliliters}
            xstep={1}
            onChange={({ x }) => {
              updateDosage(index, x);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Sliders;
