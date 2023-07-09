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
                // const datetime = workshop.datetime.split("T")[0];

                return (
                  <tr key={workshop.id}>
                    <td>{workshop.datetime}</td>
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
