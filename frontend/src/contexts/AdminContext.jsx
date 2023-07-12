import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const AdminContext = createContext();

export default AdminContext;

export function AdminProvider({ children }) {
  const [workshops, setWorkshops] = useState([]);
  const [workshopById, setWorkshopById] = useState([]);
  const [winesOnWorkshop, setWinesOnWorkshop] = useState([]);
  const [usersInWorkshop, setUsersInWorkshop] = useState([]);

  const AdminValue = useMemo(
    () => ({
      workshops,
      setWorkshops,
      workshopById,
      setWorkshopById,
      winesOnWorkshop,
      setWinesOnWorkshop,
      usersInWorkshop,
      setUsersInWorkshop,
    }),
    [workshops, workshopById, winesOnWorkshop, usersInWorkshop]
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
