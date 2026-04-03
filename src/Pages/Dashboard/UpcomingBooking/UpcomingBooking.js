import { useEffect, useState } from "react";
import "./UpcomingBookings.css";
import { IoChevronForward } from "react-icons/io5";
import Loader from "../../../Template/Loader/Loader";
import { getTodaysBookingAPI, sendOtpAPI, verifyOtpAPI } from "../../../utils/APIs/dashboardApis";
import OtpVerifyModal from "./OtpVerifyModal/OtpVerifyModal";
import BookingMapModal from "./BookingMapModal/BookingMapModal";

const UpcomingBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [otpLoading, setOtpLoading] = useState(false);

  const [showMap, setShowMap] = useState(false);
  const [mapBooking, setMapBooking] = useState(null);

  const fetchTodaysBookings = async () => {
    try {
      setLoading(true);
      const response = await getTodaysBookingAPI(1, 10);
      const data = response?.data?.data || [];
      setBookings(data);
    } catch (error) {
      console.error("Error fetching today's bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (item) => {
    try {
      const mobile = item?.mobileNumber || item?.phone;
      if (!mobile) return alert("Mobile number not found");

      setOtpLoading(true);
      const response = await sendOtpAPI(mobile, item?._id);
      console.log("OTP SENT RESPONSE",response)
      if (response?.data?.success) {
        setSelectedBooking(item);
        alert(`OTP sent successfully to ${mobile}`);
      }
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || error?.response?.data?.error || error?.message || "Something went wrong";
      if (status === 404) alert("API not found (404).");
      else if (status === 500) alert("Server error.");
      else alert(message);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtpOrder = async (otp) => {
    try {
      if (!selectedBooking) return alert("No booking selected");
      setOtpLoading(true);

      const mobile = selectedBooking?.mobileNumber || selectedBooking?.phone;
      const res = await verifyOtpAPI(mobile, otp, selectedBooking._id);
      if (res.data.success) {
        alert("Order Verified ✅");
        setBookings(prev => prev.map(b => b._id === selectedBooking._id ? { ...b, verified: true } : b));
        setShowOtpModal(false);
      } else alert("Invalid OTP");
    } catch {
      alert("Verification failed");
    } finally {
      setOtpLoading(false);
    }
  };

  useEffect(() => {
    fetchTodaysBookings();
  }, []);

  return (
    <div className="todays-shoot-wrapper">
      <h4 className="todays-title">Today’s Shoots</h4>

      {loading && <Loader />}
      {!loading && bookings.length === 0 && <p>No bookings for today</p>}

      {bookings.map((item, index) => (
        <div key={index} className="shoot-card">
          <div>
            <div className="shoot-name">{item?.title || item?.clientName || "N/A"}</div>
            {/* <div className="shoot-sub">
              • {item?.eventType || item?.type || "Service"}
              <span className="dot">📍 {item?.address || item?.city || "Location"}</span>
            </div> */}

            <div className="shoot-sub">
  • {item?.eventType || item?.type || "Service"}{" "}
  {item?.lat && item?.lng ? (
    <span
      className="dot clickable-address"
      onClick={() => { setMapBooking(item); setShowMap(true); }}
      title="View on map"
    >
      📍 {item?.address || item?.city || "Location"}
    </span>
  ) : (
    <span className="dot">📍 {item?.address || item?.city || "Location"}</span>
  )}
</div>
          </div>

          <div className="shoot-action-wrapper">
            {!item?.verified && (
              <button className="btn-send-otp" onClick={() => handleSendOtp(item)}>
                {otpLoading ? "Sending OTP.." : "Send OTP"}
              </button>
            )}

            {item?.verified ? (
              <button className="btn-verify-order" disabled>Verified ✅</button>
            ) : (
              <button className="btn-verify-order" onClick={() => { setSelectedBooking(item); setShowOtpModal(true); }}>Verify Order</button>
            )}

            {/* Map buttons */}
         
          </div>
          <IoChevronForward className="arrow-icon" />
        </div>
      ))}

      <OtpVerifyModal
        show={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onVerify={handleVerifyOtpOrder}
        loading={otpLoading}
        mobile={selectedBooking?.mobileNumber || selectedBooking?.phone}
      />

      <BookingMapModal show={showMap} onClose={() => setShowMap(false)} booking={mapBooking} />
    </div>
  );
};

export default UpcomingBookings;


// import "./UpcomingBookings.css";
// import { FiClock } from "react-icons/fi";
// import { IoChevronForward } from "react-icons/io5";

// const UpcomingBookings = () => {
//   const bookings = [
//     {
//       title: "Riya & Shounak",
//       type: "Wedding Ceremony",
//       location: "Mumbai",
//       time: "10.00 AM",
//     },
//     {
//       title: "Arya Patel",
//       type: "Fashion Shoot",
//       location: "Studio",
//       time: "4.00 PM",
//     },
//     {
//       title: "Riya & Shounak",
//       type: "Wedding Ceremony",
//       location: "Mumbai",
//       time: "10.00 AM",
//     },
//     {
//       title: "Arya Patel",
//       type: "Fashion Shoot",
//       location: "Studio",
//       time: "4.00 PM",
//     },
//   ];

//   return (
//     <div className="todays-shoot-wrapper">
//       <h4 className="todays-title">Today’s Shoots</h4>

//       {bookings.map((item, index) => (
//         <div key={index} className="shoot-card">
          
//           {/* Left */}
//           <div>
//             <div className="shoot-name">{item.title}</div>

//             <div className="shoot-sub">
//               • {item.type}
//               <span className="dot">📍 {item.location}</span>
//             </div>
//           </div>

//           {/* Right */}
//           <div className="shoot-time-wrapper">
//             <div className="shoot-time">
//               <FiClock /> {item.time}
//             </div>
//             <IoChevronForward className="arrow-icon" />
//           </div>

//         </div>
//       ))}
//     </div>
//   );
// };

// export default UpcomingBookings;
