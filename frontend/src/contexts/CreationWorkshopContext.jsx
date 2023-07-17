/* eslint-disable camelcase */
import { createContext, useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CreationWorkshopContext = createContext();
export default CreationWorkshopContext;

// Classe avec le constructeur utilisé dans la fonction handleFillSelectedWines()

class SelectedWine {
  constructor(dosage, idNewWine, idTastingNote) {
    this.dosage = dosage;
    this.id_new_wine = idNewWine;
    this.id_tasting_note = idTastingNote;
  }
}

export function CreationWorkshopProvider({ children }) {
  const [workshopData, setWorkshopData] = useState(null);
  const [newWine, setNewWine] = useState(null);
  const [newWineData, setNewWineData] = useState([{ id: null }]);
  const [blendedWine, setBlendedWine] = useState(null);
  const [existingWineByTastingNote, setExistingWineByTastingNote] = useState(
    []
  );
  // const [selectedWinesIds, setSelectedWinesIds] = useState(null);
  const [selectedWines, setSelectedWines] = useState([]);
  const [workshopSelectedWines, setWorkshopSelectedWines] = useState([]);
  const [maxSelected, setMaxSelected] = useState(false);
  // const [wineSelectedCounter, setWineSelectedCounter] = useState(0);
  const wineSelectedCounter = 3;
  const selectedWinesIds = [1, 4, 3];
  const [wineSelectedDosages, setWineSelectedDosages] = useState(
    Array(selectedWinesIds.length).fill(0)
  );

  // Fonction qui créé un objet de type SelectedWine en fonction du compteur 'wineSelectedCounter' (nombre de vins sélectionnés).
  const handleFillSelectedWines = () => {
    const selectedWinesArray = [];
    if (
      wineSelectedDosages &&
      selectedWinesIds &&
      wineSelectedDosages.length === wineSelectedCounter &&
      selectedWinesIds.length === wineSelectedCounter
    ) {
      for (let i = 0; i < wineSelectedCounter; i += 1) {
        const dosage = wineSelectedDosages[i];
        const id_new_wine = newWineData[0].id + 1;
        const id_tasting_note = selectedWinesIds[i];
        const newObj = new SelectedWine(dosage, id_new_wine, id_tasting_note);
        selectedWinesArray.push(newObj);
      }
      setSelectedWines(selectedWinesArray);
      return selectedWinesArray;
    }
    console.info("Données incomplètes");
    return [];
  };

  useEffect(() => {
    const selectedWinesResult = handleFillSelectedWines();
    setWorkshopSelectedWines(selectedWinesResult); // Mettez à jour la variable d'état
  }, [wineSelectedDosages, newWineData]);

  const CreationWorkshopValue = useMemo(() => {
    return {
      selectedWines,
      setSelectedWines,
      setWorkshopData,
      workshopData,
      newWine,
      setNewWine,
      newWineData,
      setNewWineData,
      blendedWine,
      setBlendedWine,
      existingWineByTastingNote,
      setExistingWineByTastingNote,
      workshopSelectedWines,
      setWineSelectedDosages,
      wineSelectedDosages,
      // setSelectedWinesIds,
      selectedWinesIds,
      // setWineSelectedCounter,
      wineSelectedCounter,
      setMaxSelected,
      maxSelected,
    };
  }, [
    selectedWines,
    workshopData,
    newWine,
    newWineData,
    blendedWine,
    workshopSelectedWines,
    existingWineByTastingNote,
    selectedWinesIds,
    wineSelectedDosages,
    wineSelectedCounter,
    maxSelected,
  ]);

  return (
    <CreationWorkshopContext.Provider value={CreationWorkshopValue}>
      {children}
    </CreationWorkshopContext.Provider>
  );
}

CreationWorkshopProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
