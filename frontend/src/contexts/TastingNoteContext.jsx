/* eslint-disable radix */
import { createContext, useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";

const TastingNoteContext = createContext();

export default TastingNoteContext;

export function TastingNoteProvider({ children }) {
  // Data recovery from 'TasteStage1Sliders' component
  const [idTasteSweetnessValue, setIdTasteSweetnessValue] = useState(0);
  const [idAcidityValue, setIdAcidityValue] = useState(0);
  const [idTasteAlcoholValue, setIdTasteAlcoholValue] = useState(0);
  const [idTasteTanninValue, setIdTasteTanninValue] = useState(0);

  const [tastingNote, setTastingNote] = useState({
    wineQuality: "",
    idOlfactiveIntensity: null,
    idUser: null,
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
    idFlavorAromas: null,
  });

  const handleFillVisualColorId = (e, value) => {
    e.preventDefault();
    setTastingNote({
      ...tastingNote,
      idVisualColor: value,
    });
  };

  // -------------------- Function retrieving the sliders ids from the tasting "mouth" section --------------------//
  const handleFillmouthId = () => {
    setTastingNote({
      ...tastingNote,
      idTasteSweetness: parseInt(`${idTasteSweetnessValue}`),
      idTasteAlcohol: parseInt(`${idTasteAlcoholValue}`),
      idAcidity: parseInt(`${idAcidityValue}`),
      idTasteTannin: parseInt(`${idTasteTanninValue}`),
    });
  };

  // useEffect who Update ids

  useEffect(() => {
    handleFillmouthId();
  }, [
    idTasteSweetnessValue,
    idAcidityValue,
    idTasteAlcoholValue,
    idTasteTanninValue,
  ]);

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
