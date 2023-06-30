import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const TastingContext = createContext();

export function TastingProvider({ children }) {
  const [visualData, setVisualData] = useState(null);
  const [olfactiveData, setOlfactiveData] = useState(null);
  const [mouthSlidersData, setMouthSlidersData] = useState(null);
  const [mouthData, setMouthData] = useState(null);

  const tastingValue = useMemo(() => {
    return {
      visualData,
      setVisualData,
      olfactiveData,
      setOlfactiveData,
      mouthSlidersData,
      setMouthSlidersData,
      mouthData,
      setMouthData,
    };
  }, [visualData, olfactiveData, mouthSlidersData, mouthData]);

  return (
    <TastingContext.Provider value={tastingValue}>
      {children}
    </TastingContext.Provider>
  );
}

TastingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TastingContext;
