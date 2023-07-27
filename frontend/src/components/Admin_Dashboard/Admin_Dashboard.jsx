import React, { useContext, useEffect, useState } from "react";
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
  const [events, setEvents] = useState([]);

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

  // onClick function to fetch and navigate to specific workshops when a day is clicked
  const handleClickDay = (date) => {
    onChange(date);

    const formattedDate = date.toLocaleDateString("fr-FR").split("/").join("");

    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/workshop/date/${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
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

  // fetch all workshops by clicking on the link
  const handleClick = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/workshop`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setWorkshops(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // function to get the workshops data and compare with calendar date
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/workshop`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  const formattedEvents = events.map((event) => new Date(event.datetime));

  // ---------------------------------------------------return-------------------------------------------------------
  return (
    <div className={`dashboard ${isMenuOpen ? "open" : ""}`}>
      <div className="dashboardContent">
        <div className="sideBarLogo">
          <img src={logo} alt="logo" />
        </div>
        <div className="sideBarLinks">
          <button type="button" onClick={() => navigate("/admin/dashboard")}>
            <i className="fi fi-rr-house-chimney" />
            Accueil
          </button>
          <button type="button" onClick={() => navigate("/admin/users")}>
            <i className="fi fi-rr-users-alt" />
            Gestion des utilisateurs
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/admin/workshops");
              handleClick();
            }}
          >
            <i className="fi fi-rr-notebook" />
            Ateliers
          </button>

          <button type="button" onClick={() => navigate("/admin/wines")}>
            <i className="fi fi-rr-grape" />
            Vins
          </button>
        </div>
        <div className="calendarContent">
          <h3>Planning</h3>
          <Calendar
            onClickDay={handleClickDay}
            value={value}
            defaultView="month"
            minDetail="year"
            className="calendar"
            tileClassName={({ date }) => {
              const isEvent = formattedEvents.find((event) =>
                isSameDay(event, date)
              );
              return `itemCalendar ${isEvent ? "event-day" : ""} ${
                value && value.toDateString() === date.toDateString()
                  ? "clicked"
                  : ""
              }`;
            }}
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
