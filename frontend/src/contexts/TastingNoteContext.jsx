import React, { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const TastingNoteContext = createContext();

export default TastingNoteContext;

export function TastingNoteProvider({ children }) {
  const [tastingNote, setTastingNote] = useState({
    wineQuality: "",
    idOlfactiveIntensity: null,
    idUser: null,
    selectedWine: 0,
    rating: 0,
    tastingCommentary: "",
    idOlfactiveComplexity: null,
    idVisualColor: null,
    idVisualLimpidity: null,
    idVisualBrightness: null,
    idVisualTears: null,
    idTasteIntensity: null,
    idTasteMouthFeel: null,
    idTasteAlcohol: null,
    idAcidity: null,
    idTasteSweetness: null,
    idTasteTannin: null,
    idVisualIntensity: null,
    idOlfactiveAromas: null,
    selectedWines: [], // Ajout de selectedWines comme un tableau vide
  });

  const handleFillVisualColorId = (e, value) => {
    e.preventDefault();
    setTastingNote((prevTastingNote) => ({
      ...prevTastingNote,
      idVisualColor: value,
    }));
  };

  const tastingNoteValue = useMemo(() => {
    const handleSelectWine = (wineNumber) => {
      setTastingNote((prevTastingNote) => {
        const selectedWines = prevTastingNote.selectedWines.includes(wineNumber)
          ? prevTastingNote.selectedWines.filter((num) => num !== wineNumber)
          : [...prevTastingNote.selectedWines, wineNumber];

        return {
          ...prevTastingNote,
          selectedWines,
        };
      });
    };

    return {
      tastingNote,
      setTastingNote,
      handleFillVisualColorId,
      handleSelectWine,
    };
  }, [tastingNote]);

  return (
    <TastingNoteContext.Provider value={tastingNoteValue}>
      {children}
    </TastingNoteContext.Provider>
  );
}

TastingNoteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
