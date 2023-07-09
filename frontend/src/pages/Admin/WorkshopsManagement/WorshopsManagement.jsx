import { useContext } from "react";
import AdminDashboard from "../../../components/Admin_Dashboard/Admin_Dashboard";
import AdminContext from "../../../contexts/AdminContext";
import "./WorkshopsManagement.scss";

function WorkshopsManagement() {
  const { workshops } = useContext(AdminContext);

  return (
    <>
      <AdminDashboard />
      <div className="workshopsContent">
        <div className="tableHeader">
          <h1>Ateliers</h1>
        </div>
        <div className="tableSection">
          <table className="workshopsTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Lieu</th>
                <th>Commentaire</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workshops.map((workshop) => {
                const dateElement = workshop.datetime.split("T")[0].split("-");
                const date = `${dateElement[2]}/${dateElement[1]}/${dateElement[0]}`;
                const hourElement = workshop.datetime.split("T")[1].split(":");
                const hour = `${hourElement[0]}:${hourElement[1]}`;

                return (
                  <tr key={workshop.id}>
                    <td>{`${date} ${hour}`}</td>
                    {workshop.wine_type.toLowerCase() === "rouge" ? (
                      <td>
                        <div className="redWine" />
                      </td>
                    ) : (
                      <td>
                        <div className="whiteWine" />
                      </td>
                    )}

                    <td>{workshop.place}</td>
                    <td>
                      <p className="commentary">{workshop.commentary}</p>
                    </td>
                    <td>
                      <div className="actionButtons">
                        <button type="button" className="editBtn">
                          <i className="fi fi-rr-edit" />
                        </button>
                        <button type="button" className="deleteBtn">
                          <i className="fi fi-rr-trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default WorkshopsManagement;
