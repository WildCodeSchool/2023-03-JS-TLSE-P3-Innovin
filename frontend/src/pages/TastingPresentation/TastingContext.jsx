import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const TastingContext = createContext();

export function TastingProvider({ children }) {
  const [tastingData, setTastingData] = useState(null);

  const contextValue = useMemo(
    () => ({ tastingData, setTastingData }),
    [tastingData, setTastingData]
  );

  return (
    <TastingContext.Provider value={contextValue}>
      {children}
    </TastingContext.Provider>
  );
}

TastingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TastingContext;
