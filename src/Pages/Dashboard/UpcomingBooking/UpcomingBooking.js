import "./UpcomingBookings.css";
import { FiClock } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";

const UpcomingBookings = () => {
  const bookings = [
    {
      title: "Riya & Shounak",
      type: "Wedding Ceremony",
      location: "Mumbai",
      time: "10.00 AM",
    },
    {
      title: "Arya Patel",
      type: "Fashion Shoot",
      location: "Studio",
      time: "4.00 PM",
    },
    {
      title: "Riya & Shounak",
      type: "Wedding Ceremony",
      location: "Mumbai",
      time: "10.00 AM",
    },
    {
      title: "Arya Patel",
      type: "Fashion Shoot",
      location: "Studio",
      time: "4.00 PM",
    },
  ];

  return (
    <div className="todays-shoot-wrapper">
      <h4 className="todays-title">Today’s Shoots</h4>

      {bookings.map((item, index) => (
        <div key={index} className="shoot-card">
          
          {/* Left */}
          <div>
            <div className="shoot-name">{item.title}</div>

            <div className="shoot-sub">
              • {item.type}
              <span className="dot">📍 {item.location}</span>
            </div>
          </div>

          {/* Right */}
          <div className="shoot-time-wrapper">
            <div className="shoot-time">
              <FiClock /> {item.time}
            </div>
            <IoChevronForward className="arrow-icon" />
          </div>

        </div>
      ))}
    </div>
  );
};

export default UpcomingBookings;
