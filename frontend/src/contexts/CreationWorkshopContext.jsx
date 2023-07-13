/* eslint-disable camelcase */
import React, { createContext, useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CreationWorkshopContext = createContext();

// Classe avec le constructeur utilisé dans la fonction handleFillSelectedWines()

class SelectedWine {
  constructor(dosage, idNewWine, idTastingNote) {
    this.dosage = dosage;
    this.idNewWine = idNewWine;
    this.idTastingNote = idTastingNote;
  }
}

export default CreationWorkshopContext;

export function CreationWorkshopProvider({ children }) {
  const [workshopData, setWorkshopData] = useState(null);
  const [tastingNoteIds, setTastingNoteIds] = useState(null);
  const [wineSelectedDosages, setWineSelectedDosages] = useState(null);
  const [maxSelected, setMaxSelected] = useState(false);
  const [wineSelectedCounter, setWineSelectedCounter] = useState(0);

  const [selectedWines, setSelectedWines] = useState([]);

  // Fonction qui créé un objet de type SelectedWine en fonction du compteur 'wineSelectedCounter' (nombre de vins sélectionnés).
  const handleFillSelectedWines = () => {
    if (
      wineSelectedDosages &&
      tastingNoteIds &&
      wineSelectedDosages.length === wineSelectedCounter &&
      tastingNoteIds.length === wineSelectedCounter
    ) {
      const workshopSelectedWines = [];
      for (let i = 0; i < wineSelectedCounter; i += 1) {
        const dosage = wineSelectedDosages[i];
        const { id_new_wine } = workshopData[0];
        const id_tasting_note = tastingNoteIds[i];

        const newObj = new SelectedWine(dosage, id_new_wine, id_tasting_note);
        workshopSelectedWines.push(newObj);
      }
      setSelectedWines(workshopSelectedWines);
    } else {
      console.info("Données incomplètes");
    }
  };

  useEffect(() => {
    handleFillSelectedWines();
  }, [tastingNoteIds, wineSelectedDosages, workshopData]);

  const CreationWorkshopValue = useMemo(() => {
    return {
      selectedWines,
      setSelectedWines,
      setWorkshopData,
      workshopData,
      setWineSelectedDosages,
      setTastingNoteIds,
      tastingNoteIds,
      setWineSelectedCounter,
      wineSelectedDosages,
      setMaxSelected,
      maxSelected,
    };
  }, [
    selectedWines,
    workshopData,
    tastingNoteIds,
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
