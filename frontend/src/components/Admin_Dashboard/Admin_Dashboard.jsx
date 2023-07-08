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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  // ---------------------------------------------------functions-------------------------------------------------------

  // Function to format days names in calendar
  const dayInitials = ["D", "L", "M", "M", "J", "V", "S"];

  const formatShortWeekday = (_, date) => {
    const dayIndex = date.getDay();
    return dayInitials[dayIndex];
  };

  // function to open and close the sideBar
  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // onClick function to fetch and navigate to specific workshop when a day is clicked
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

  // ---------------------------------------------------return-------------------------------------------------------
  return (
    <div className={`dashboard ${isMenuOpen ? "open" : ""}`}>
      <div className="dashboardContent">
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
            formatShortWeekday={formatShortWeekday}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleOpenMenu}
        className={`closeSidebarButton ${isMenuOpen && "showCloseButton"}`}
      >
        <i className="fi fi-tr-circle-xmark" />
      </button>
      <button
        className={`openSidebarButton ${isMenuOpen ? "hideButton" : ""}`}
        type="button"
        onClick={handleOpenMenu}
      >
        <i className="fi fi-br-burger-alt" />
      </button>
    </div>
  );
}

export default AdminDashboard;
