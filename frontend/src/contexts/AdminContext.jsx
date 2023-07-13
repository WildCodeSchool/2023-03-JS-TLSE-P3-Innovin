import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const AdminContext = createContext();

export default AdminContext;

export function AdminProvider({ children }) {
  const [workshops, setWorkshops] = useState([]);
  const [workshopById, setWorkshopById] = useState({});
  const [winesOnWorkshop, setWinesOnWorkshop] = useState([]);
  const [usersInWorkshop, setUsersInWorkshop] = useState([]);
  const [idToUpdate, setIdToUpdate] = useState(0);

  // function to format a date
  const refactorDate = (dateToRefactor) => {
    if (dateToRefactor) {
      const dateElement = dateToRefactor.split("T")[0].split("-");
      const date = `${dateElement[2]}/${dateElement[1]}/${dateElement[0]}`;
      const hourElement = dateToRefactor.split("T")[1].split(":");
      const hour = `${hourElement[0]}:${hourElement[1]}`;

      return `${date} ${hour}`;
    }
    return "";
  };

  const dateToPost = (dateToRefactor) => {
    if (dateToRefactor) {
      const dateElement = dateToRefactor.split("T")[0].split("-");
      const date = `${dateElement[0]}-${dateElement[1]}-${dateElement[2]}`;
      const hourElement = dateToRefactor.split("T")[1].split(":");
      const hour = `${hourElement[0]}:${hourElement[1]}`;

      return `${date} ${hour}`;
    }
    return "";
  };

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
      refactorDate,
      dateToPost,
      idToUpdate,
      setIdToUpdate,
    }),
    [workshops, workshopById, winesOnWorkshop, usersInWorkshop, idToUpdate]
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
