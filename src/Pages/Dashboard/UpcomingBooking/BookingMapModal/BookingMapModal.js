import { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import "./BookingMapModal.css";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  disableDefaultUI: false,
  zoomControl: true,
};

export default function BookingMapModal({ show, onClose, booking }) {
  const [fullScreen, setFullScreen] = useState(false);

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!show || !booking || !booking.lat || !booking.lng) return null;
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  const center = { lat: booking.lat, lng: booking.lng };

  return (
    <div className="map-overlay">
      <div
        className={`map-container ${fullScreen ? "fullscreen" : ""}`}
        style={{ width: fullScreen ? "100%" : "80%", height: fullScreen ? "100%" : "500px" }}
      >
        <div className="map-header">
          <strong>{booking.clientName || "Client"} Location</strong>
          <div className="map-buttons">
            <button className="btn" onClick={() => setFullScreen(!fullScreen)}>
              {fullScreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
            <button className="btn map-btn-close" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
        <div className="map-body">
          <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={center} options={options}>
            <Marker position={center} />
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}