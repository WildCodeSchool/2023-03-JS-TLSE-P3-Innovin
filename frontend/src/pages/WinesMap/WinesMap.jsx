import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "leaflet/dist/leaflet.css";
import wineMap from "../../assets/wine.geojson";
import "./WinesMap.scss";
import logo from "../../assets/Logo_W_Circles.svg";

export default function WinesMap() {
  // popup properties
  const onEachRegion = (feature, layer) => {
    const bassin = feature.properties.Bassin;
    const cepageRouge = feature.properties.CepageRouge;
    const cepageBlanc = feature.properties.CepageBlanc;
    const appellations = feature.properties.Appellation;
    const terroir = feature.properties.Terroirs;
    const production = feature.properties.Production;

    // popup color change
    layer.setStyle({
      color: feature.properties.stroke,
      weight: feature.properties["stroke-width"],
      opacity: feature.properties["stroke-opacity"],
      fillColor: feature.properties.fill,
      fillOpacity: feature.properties["fill-opacity"],
    });

    // popup content
    const popupContent = `
    <div>
     <div style="text-align: center; font-weight: bold; font-size: 18px;">
      ${bassin}<br/><br/>
    </div>
    
      <b>  Les principaux cépages rouges :</b> ${cepageRouge}<br/><br/>
    
       <b> Les principaux cépages blancs:</b> ${cepageBlanc}<br/><br/>
      <b>Appellations:</b> ${appellations}<br/><br/>
  <b>Terroir:</b> ${terroir}<br/><br/>
      <b>Production:</b> ${production}<br/><br/>
    </div>`;
    layer.bindPopup(popupContent);
  };
  return (
    <div className="pageContentMap">
      <Navbar />
      <header>
        <img className="img-logo" src={logo} alt="" />
        <h1 className="titleMap">
          Les principales régions viticoles françaises
        </h1>
      </header>
      <div className="map">
        <MapContainer
          center={[46.603354, 1.888334]}
          zoom={5}
          minZoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GeoJSON data={wineMap} onEachFeature={onEachRegion} />
        </MapContainer>
      </div>
      <Footer />
    </div>
  );
}
