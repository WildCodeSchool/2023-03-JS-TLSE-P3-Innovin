/* eslint-disable camelcase */

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AdminDashboard from "../../../components/Admin_Dashboard/Admin_Dashboard";
import "./WorkshopModification.scss";
import AdminContext from "../../../contexts/AdminContext";
import AuthContext from "../../../contexts/AuthContext";
import Input from "../../../components/Input";
import Dropdown from "../../../components/Dropdown/Dropdown";
import ButtonPrimary from "../../../components/ButtonPrimary";

function WorkshopModification() {
  const { idToUpdate, dateToPost } = useContext(AdminContext);
  const { userToken } = useContext(AuthContext);
  const [workshopToUpdate, setWorkshopToUpdate] = useState({});

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const updatedDate = new Date(workshopToUpdate.datetime);
    updatedDate.setFullYear(selectedDate.getFullYear());
    updatedDate.setMonth(selectedDate.getMonth());
    updatedDate.setDate(selectedDate.getDate());
    setWorkshopToUpdate({
      ...workshopToUpdate,
      datetime: updatedDate.toISOString(),
    });
  };

  const handleTimeChange = (event) => {
    const [hours, minutes] = event.target.value.split(":");
    const updatedDate = new Date(workshopToUpdate.datetime);
    updatedDate.setUTCHours(hours);
    updatedDate.setUTCMinutes(minutes);
    setWorkshopToUpdate({
      ...workshopToUpdate,
      datetime: updatedDate.toISOString(),
    });
  };
  const handlePlaceChange = (event) => {
    setWorkshopToUpdate({
      ...workshopToUpdate,
      place: event.target.value,
    });
  };

  const handleChangeComment = (event) => {
    setWorkshopToUpdate({
      ...workshopToUpdate,
      commentary: event.target.value,
    });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/workshop/${idToUpdate}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setWorkshopToUpdate(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [idToUpdate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { id, id_new_wine, ...formData } = workshopToUpdate;
    const form = { ...formData, datetime: dateToPost(formData.datetime) };

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/workshop/${idToUpdate}`, form, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.info(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    workshopToUpdate &&
    userToken && (
      <div className="wsModification">
        <AdminDashboard />
        <div className="globalModifContainer">
          <div className="modifContent">
            <h1>Modification de l'atelier N° {workshopToUpdate.id}</h1>
            <form action="" onSubmit={handleSubmit}>
              <div className="dateTime">
                {" "}
                <div className="date">
                  <p className="textLabel">Date</p>
                  <label htmlFor="datetime" className="dateLabel">
                    <Input
                      type="date"
                      name="datetime"
                      id="datetime"
                      value={
                        workshopToUpdate.datetime
                          ? workshopToUpdate.datetime.split("T")[0]
                          : ""
                      }
                      autoComplete="date"
                      onChange={handleDateChange}
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
                        workshopToUpdate.datetime
                          ? workshopToUpdate.datetime.slice(11, 16)
                          : ""
                      }
                      autoComplete="time"
                      onChange={handleTimeChange}
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
                    value={workshopToUpdate.place}
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
                  object={workshopToUpdate}
                  setObject={setWorkshopToUpdate}
                  inputValue={workshopToUpdate.wine_type}
                />
              </div>
              <div className="commentArea">
                <p className="textLabel">Commentaire</p>
                <label htmlFor="commentary">
                  <textarea
                    name="commentary"
                    id="commentary"
                    value={workshopToUpdate.commentary}
                    onChange={(e) => handleChangeComment(e)}
                  />
                </label>
              </div>
              <ButtonPrimary type="submit">Modifier</ButtonPrimary>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

export default WorkshopModification;
