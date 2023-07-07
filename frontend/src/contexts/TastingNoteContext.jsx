import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const TastingNoteContext = createContext();

export default TastingNoteContext;

export function TastingNoteProvider({ children }) {
  const [idTasteSweetnessValue, setIdTasteSweetnessValue] = useState(0);
  const [idAcidityValue, setIdAcidityValue] = useState(0);
  const [idTasteAlcoholValue, setIdTasteAlcoholValue] = useState(0);
  const [idTasteTanninValue, setIdTasteTanninValue] = useState(0);

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

  const handleFillmouthId = () => {
    setTastingNote({
      ...tastingNote,
      idTasteSweetness: `${idTasteSweetnessValue}`,
      idTasteAlcohol: `${idTasteAlcoholValue}`,
      idAcidity: `${idAcidityValue}`,
      idTasteTannin: `${idTasteTanninValue}`,
    });
  };
  console.info(handleFillmouthId);

  const tastingNoteValue = useMemo(() => {
    return {
      tastingNote,
      setIdTasteSweetnessValue,
      setIdAcidityValue,
      setIdTasteAlcoholValue,
      setIdTasteTanninValue,
      setTastingNote,
      handleFillVisualColorId,
      handleFillmouthId,
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
