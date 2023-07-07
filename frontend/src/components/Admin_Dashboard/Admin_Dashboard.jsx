import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./Admin_Dashboard.scss";
import Calendar from "react-calendar";
import logo from "../../assets/Logo_W_Circles.svg";
import AuthContext from "../../contexts/AuthContext";
import AdminContext from "../../contexts/AdminContext";

function AdminDashboard() {
  const { setWorkshops } = useContext(AdminContext);
  const { userToken } = useContext(AuthContext);
  const [value, onChange] = useState(new Date());
  const navigate = useNavigate();

  const handleClick = (date) => {
    onChange(date);

    const formattedDate = date.toLocaleDateString("fr-FR").split("/").join("");

    axios
      .get(`http://localhost:5000/workshop/date/${formattedDate}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.info(response.data);
        setWorkshops(response.data);
      })
      .catch((err) => {
        console.error(err);
      });

    if (window.location.pathname !== "/admin/workshops") {
      navigate("/admin/workshops");
    }
  };

  return (
    <div className="dashboard">
      <div className="sideBarLogo">
        <img src={logo} alt="logo" />
      </div>
      <div className="sideBarLinks">
        <button type="button">
          <i className="fi fi-rr-house-chimney" />
          Accueil
        </button>
        <button type="button">
          <i className="fi fi-rr-users-alt" />
          Gestion des utilisateurs
        </button>
        <button type="button">
          <i className="fi fi-rr-notebook" />
          Ateliers
        </button>
        <button type="button">
          <i className="fi fi-rr-glass-champagne" />
          Fiches de dégustation
        </button>
        <button type="button">
          <i className="fi fi-rr-grape" />
          Vins
        </button>
        <button type="button">
          <i className="fi fi-rr-trophy-star" />
          Sélection concours
        </button>
      </div>
      <div className="calendarContent">
        <h3>Planning</h3>
        <Calendar
          onClickDay={handleClick}
          value={value}
          defaultView="month"
          minDetail="year"
          className="calendar"
          tileClassName={({ date }) =>
            `itemCalendar ${
              value && value.toDateString() === date.toDateString()
                ? "clicked"
                : ""
            }`
          }
          prevAriaLabel="Previous"
          prev2AriaLabel="Jump backwards"
          nextAriaLabel="Next"
          next2AriaLabel="Jump forwards"
          showWeekNumbers
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
