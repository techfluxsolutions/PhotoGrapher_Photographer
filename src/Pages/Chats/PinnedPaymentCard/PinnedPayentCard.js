// import React from "react";
// import "./PinnedPayentCard"
// const PinnedPaymentCard = ({ pinned, formatDate }) => {
//   if (!pinned) return null;

//   return (
//     <div className="pinned-wrapper">
//       <div className="pinned-label">📌 Pinned Message</div>

//       <div className="pinned-card">
//         <div className="pinned-row">
//           <span className="label">Event</span>
//           <span className="value">{pinned.eventType}</span>
//         </div>

//         <div className="pinned-row">
//           <span className="label">Location</span>
//           <span className="value">{pinned.location}</span>
//         </div>

//         <div className="pinned-row">
//           <span className="label">Schedule</span>
//           <span className="value">
//             {formatDate(pinned.startDate)} → {formatDate(pinned.endDate)}
//           </span>
//         </div>

//         <div className="pinned-row total">
//           <span className="label">Budget</span>
//           <span className="value">₹ {pinned.budget}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PinnedPaymentCard;


import React from "react";
import "./PinnedPaymentCard.css";

const PinnedPaymentCard = ({ pinned, formatDate }) => {
  if (!pinned) return null;

  return (
    <div className="wa-pinned-wrapper">
      <div className="wa-pinned-content">
        <span className="pin-icon">📌</span>

        <div className="wa-pinned-text">
          <div className="wa-title">
            {pinned.eventType} • ₹{pinned.budget}
          </div>
          <div className="wa-subtitle">
            {pinned.location} · {formatDate(pinned.startDate)} – {formatDate(pinned.endDate)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinnedPaymentCard;
