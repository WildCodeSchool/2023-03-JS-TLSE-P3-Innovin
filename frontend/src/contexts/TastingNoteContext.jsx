import { createContext, useMemo, useState } from "react";
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
  });

  const handleFillVisualColorId = (e, value) => {
    e.preventDefault();
    setTastingNote({
      ...tastingNote,
      idVisualColor: value,
    });
  };

  const tastingNoteValue = useMemo(() => {
    return { tastingNote, setTastingNote, handleFillVisualColorId };
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
