import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const AdminContext = createContext();

export default AdminContext;

export function AdminProvider({ children }) {
  const [workshops, setWorkshops] = useState();

  const AdminValue = useMemo(
    () => ({
      workshops,
      setWorkshops,
    }),
    [workshops]
  );

  return (
    <AdminContext.Provider value={AdminValue}>{children}</AdminContext.Provider>
  );
}

AdminProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
