import { useLocation } from "react-router-dom";
import "./GalleryAddPhotos.css";

const GalleryAddPhotos = () => {
  const { state } = useLocation();
  const booking = state?.booking;

  return (
    <div className="gallery-container">
      <h2>{booking?.shoot_type || "Photography"}</h2>

      <p className="client-name">{booking?.client_name}</p>
      <p>Event Location - {booking?.event_location}</p>
      <p>Event Date - {booking?.event_date}</p>

      <div className="upload-box">
        <p>Drag and Drop photos here</p>
        <span>OR</span>
        <button className="upload-btn">Upload to Cloud</button>
      </div>

      <button className="submit-btn">Submit</button>
    </div>
  );
};

export default GalleryAddPhotos;
