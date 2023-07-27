/* eslint-disable camelcase */
import { createContext, useContext, useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import TastingNoteContext from "./TastingNoteContext";

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
  const { tastingNote } = useContext(TastingNoteContext);
  const [nextWorkshops, setNextWorkshops] = useState([]);
  const [newWineId, setNewWineId] = useState([{ id: null }]);
  const [blendedWine, setBlendedWine] = useState(null);
  const [newWineCommentary, setnewWineCommentary] = useState(null);
  const [existingWineByTastingNote, setExistingWineByTastingNote] = useState(
    []
  );
  const [selectedWines, setSelectedWines] = useState([]);
  const [workshopSelectedWines, setWorkshopSelectedWines] = useState([]);
  const [maxSelected, setMaxSelected] = useState(false);
  const [wineSelectedCounter, setWineSelectedCounter] = useState(0);
  const { selectedTastedWinesIds } = tastingNote;
  const initTab = Array(selectedTastedWinesIds.length).fill(0);
  const [wineSelectedDosages, setWineSelectedDosages] = useState(initTab);

  useEffect(() => {
    setWineSelectedDosages(initTab);
  }, [selectedTastedWinesIds]);

  // Fonction qui créé un objet de type SelectedWine en fonction du compteur 'wineSelectedCounter' (nombre de vins sélectionnés).
  const handleFillSelectedWines = () => {
    const selectedWinesArray = [];
    if (
      wineSelectedDosages &&
      selectedTastedWinesIds &&
      wineSelectedDosages.length === wineSelectedCounter &&
      selectedTastedWinesIds.length === wineSelectedCounter
    ) {
      for (let i = 0; i < wineSelectedCounter; i += 1) {
        const dosage = wineSelectedDosages[i];
        const id_new_wine = newWineId;
        const id_tasting_note = selectedTastedWinesIds[i];
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
    setWorkshopSelectedWines(selectedWinesResult); // Met à jour la variable d'état
  }, [wineSelectedDosages, newWineId]);

  const CreationWorkshopValue = useMemo(() => {
    return {
      selectedWines,
      setSelectedWines,
      nextWorkshops,
      setNextWorkshops,
      newWineId,
      setNewWineId,
      blendedWine,
      setBlendedWine,
      newWineCommentary,
      setnewWineCommentary,
      existingWineByTastingNote,
      setExistingWineByTastingNote,
      workshopSelectedWines,
      setWineSelectedDosages,
      wineSelectedDosages,
      selectedTastedWinesIds,
      setMaxSelected,
      maxSelected,
      wineSelectedCounter,
      setWineSelectedCounter,
    };
  }, [
    newWineCommentary,
    selectedWines,
    nextWorkshops,
    newWineId,
    blendedWine,
    workshopSelectedWines,
    existingWineByTastingNote,
    selectedTastedWinesIds,
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
