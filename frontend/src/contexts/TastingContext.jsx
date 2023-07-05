import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const TastingContext = createContext();

export function TastingProvider({ children }) {
  const [visualData, setVisualData] = useState(null);
  const [olfactiveData, setOlfactiveData] = useState(null);
  const [mouthSlidersData, setMouthSlidersData] = useState(null);
  const [mouthData, setMouthData] = useState(null);

  // function which takes 3 values in parameters, arr corresponds to the global array (visualData for example), x allows to select an index of the global array (array of objects) and y corresponds to the values of the objects of the array that one wishes to recover.
  const visualDataKeys = (arr, x, y) => {
    const arrValues = [];
    const array = arr[x];

    array.map((el) => {
      const values = Object.values(el);

      return arrValues.push(values[y]);
    });

    return arrValues;
  };

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
      visualDataKeys,
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
