import React from "react";
import PropTypes from "prop-types";
import "./cardrevelation.scss";

export default function CardRevelation({ wine, cardNumber }) {
  return (
    <div className="card-revelation">
      <div className="revelation-card">
        <h3 className="h3-wine">Vin n°{cardNumber}</h3>
        <div className="img-card">
          <img className="wine-img" src={wine.picture} alt="wine" />
        </div>
        <div className="card-text">
          <div className="header-revel-card">
            <div className="card-title">
              <div className="variety">
                <p>{wine.grape_variety_name}</p>
              </div>
              <div className="vintage">
                <p>{wine.vintage}</p>
              </div>
            </div>
            <div className="winery">
              <p>{wine.winery_name}</p>
            </div>
            <div className="appellation">
              <p>{wine.appellation_name}</p>
            </div>
          </div>
          <div className="region">
            <h2 className="title-revelation">Région viticole</h2>
            <p>{wine.wine_region_name}</p>
          </div>

          <div className="alcool">
            <p>{wine.alcohol_percentage}°</p>
          </div>

          <div className="wine-info">
            <h2 className="title-revelation">Description</h2>
            <p>{wine.grape_variety_description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

CardRevelation.propTypes = {
  wine: PropTypes.shape({
    picture: PropTypes.string,
    grape_variety_description: PropTypes.string,
    grape_variety_name: PropTypes.string,
    vintage: PropTypes.number,
    alcohol_percentage: PropTypes.number,
    description: PropTypes.string,
    appellation_name: PropTypes.string,
    winery_name: PropTypes.string,
    wine_region_name: PropTypes.string,
  }).isRequired,
  cardNumber: PropTypes.number.isRequired,
};
