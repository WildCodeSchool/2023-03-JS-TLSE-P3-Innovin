import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AuthContext from "../../../contexts/AuthContext";
import AdminContext from "../../../contexts/AdminContext";
import "./WorkshopCreation.scss";
import AdminDashboard from "../../../components/Admin_Dashboard/Admin_Dashboard";
import Input from "../../../components/Input";
import Dropdown from "../../../components/Dropdown/Dropdown";
import ButtonPrimary from "../../../components/ButtonPrimary";

function WorkshopCreation() {
  const { userToken } = useContext(AuthContext);
  const { handleDateChange, handleTimeChange, dateToPost } =
    useContext(AdminContext);

  const date = new Date();
  const [workshopForm, setWorkshopForm] = useState({
    datetime: date.toISOString(),
    place: "",
    commentary: "",
    wine_type: "",
  });

  const navigate = useNavigate();

  const handlePlaceChange = (event) => {
    setWorkshopForm({
      ...workshopForm,
      place: event.target.value,
    });
  };

  const handleChangeComment = (event) => {
    setWorkshopForm({ ...workshopForm, commentary: event.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newWorkshop = {
      ...workshopForm,
      datetime: dateToPost(workshopForm.datetime),
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/workshop`, newWorkshop, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.info(res);
        navigate("/admin/workshops");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    userToken && (
      <div className="wsCreation">
        <button
          type="button"
          onClick={() => navigate("/admin/workshops")}
          className="backButton"
        >
          <i className="fi fi-rr-undo" />
        </button>
        <AdminDashboard />
        <div className="creationContainer">
          <div className="creationContent">
            <h1>Nouvel atelier de dégustation</h1>
            <form
              action=""
              method="post"
              className="createWsForm"
              onSubmit={handleFormSubmit}
            >
              <div className="dateTime">
                <div className="date">
                  <p className="textLabel">Date</p>
                  <label htmlFor="datetime" className="dateLabel">
                    <Input
                      type="date"
                      name="datetime"
                      id="datetime"
                      value={workshopForm.datetime.split("T")[0]}
                      autoComplete="date"
                      onChange={(e) =>
                        handleDateChange(e, workshopForm, setWorkshopForm)
                      }
                    />
                  </label>
                </div>
                <div className="time">
                  <p className="textLabel">Heure</p>
                  <label htmlFor="time" className="dateLabel">
                    <Input
                      type="time"
                      name="time"
                      id="time"
                      value={
                        workshopForm.datetime
                          ? workshopForm.datetime.slice(11, 16)
                          : ""
                      }
                      autoComplete="time"
                      onChange={(e) =>
                        handleTimeChange(e, workshopForm, setWorkshopForm)
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="place">
                <p className="textLabel">Lieu</p>
                <label htmlFor="place" className="placeLabel">
                  <Input
                    type="text"
                    name="place"
                    id="place"
                    value={workshopForm.place}
                    autoComplete="text"
                    onChange={handlePlaceChange}
                  />
                </label>
              </div>
              <div className="wineType">
                <p className="textLabel">Type de vin</p>
                <Dropdown
                  id="wine_type"
                  options={["Rouge", "Blanc"]}
                  name="wine_type"
                  object={workshopForm}
                  setObject={setWorkshopForm}
                  inputValue=" "
                />
              </div>
              <div className="commentArea">
                <p className="textLabel">Commentaire</p>
                <label htmlFor="commentary">
                  <textarea
                    name="commentary"
                    id="commentary"
                    value={workshopForm.commentary}
                    onChange={(e) => handleChangeComment(e)}
                  />
                </label>
              </div>
              <ButtonPrimary type="submit">Créer l'atelier</ButtonPrimary>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

export default WorkshopCreation;
