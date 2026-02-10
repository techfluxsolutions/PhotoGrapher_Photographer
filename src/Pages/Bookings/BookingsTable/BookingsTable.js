// import { useState } from "react";
// import { FiEdit, FiUpload } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import EditBookingModal from "../EditBookingModal/EditBookingModal";
// import "./BookingsTable.css";

// const dummyBookings = [
//   {
//     shootId: 1,
//     shoot_id: "BK-2026-001",
//     client_name: "Riya Sharma",
//     client_email: "riya.sharma@email.com",
//     client_mobile: "9876543210",
//     shoot_type: "Wedding",
//     event_date: "2026-01-26",
//     event_location: "Delhi",
//     photography_requirements: "Full day wedding coverage",
//     status: "Confirmed",
//   },
//   {
//     shootId: 2,
//     shoot_id: "BK-2026-002",
//     client_name: "Saurabh Kulkarni",
//     client_email: "saurabh.k@email.com",
//     client_mobile: "9988776655",
//     shoot_type: "Engagement",
//     event_date: "2026-02-10",
//     event_location: "Noida",
//     photography_requirements: "Candid + Traditional",
//     status: "Pending",
//   },
// ];

// const BookingsTable = ({ page = 1, limit = 10 }) => {
//   const navigate = useNavigate();
//   const [data] = useState(dummyBookings);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const handleGalleryUpload = (booking) => {
//     navigate(`/bookings/gallery-upload/${booking.shoot_id}`, {
//       state: { booking },
//     });
//   };

//   const calculateDaysRemaining = (date) => {
//     const diff = Math.ceil(
//       (new Date(date) - new Date()) / (1000 * 60 * 60 * 24)
//     );
//     return diff > 0 ? `${diff} Days` : "Completed";
//   };

//   return (
//     <div className="table-wrapper">
//       <table className="bookings-table">
//         <thead>
//           <tr>
//             <th>Sr.</th>
//             <th>Booking ID</th>
//             <th>Client Name</th>
//             <th>Email</th>
//             <th>Mobile</th>
//             <th>Event Type</th>
//             <th>Date</th>
//             <th>City</th>
//             <th>Requirements</th>
//             <th>Gallery</th>
//             <th>Days Left</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((item, index) => (
//             <tr key={item.shootId}>
//               <td>{index + 1}</td>
//               <td>{item.shoot_id}</td>
//               <td>{item.client_name}</td>
//               <td>{item.client_email}</td>
//               <td>{item.client_mobile}</td>
//               <td>{item.shoot_type}</td>
//               <td>{item.event_date}</td>
//               <td>{item.event_location}</td>
//               <td>{item.photography_requirements}</td>

//               <td>
//                 <FiUpload
//                   size={18}
//                   style={{ cursor: "pointer" }}
//                   onClick={() => handleGalleryUpload(item)}
//                 />
//               </td>

//               <td>{calculateDaysRemaining(item.event_date)}</td>

//               <td>
//                 <span className={`status ${item.status}`}>
//                   {item.status}
//                 </span>
//               </td>

//               <td>
//                 <FiEdit
//                   size={16}
//                   style={{ cursor: "pointer" }}
//                   onClick={() => {
//                     setSelectedBooking(item);
//                     setShowEditModal(true);
//                   }}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <EditBookingModal
//         booking={selectedBooking}
//         isOpen={showEditModal}
//         onClose={() => setShowEditModal(false)}
//       />
//     </div>
//   );
// };

// export default BookingsTable;



import { useEffect, useState } from "react";
import { FiEdit, FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import EditBookingModal from "../EditBookingModal/EditBookingModal";

import "./BookingsTable.css";
import { getBookings } from "../../../utils/APIs/bookingsApis";
import Loader from "../../../Loader/Loader";

const BookingsTable = ({ page: initialPage = 1, limit = 10 }) => {
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  /* ================= FETCH BOOKINGS ================= */

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await getBookings(page, limit);

      if (res?.data?.success) {
        const { bookings, meta } = res.data.data;

        /* ---------- Map API response ---------- */

        const mappedData = bookings.map((item) => ({
          shootId: item._id,
          shoot_id: item.bookingId,
          client_name: item.client_id?.username || "N/A",
          client_email: item.client_id?.email || "N/A",
          client_mobile: item.client_id?.mobileNumber || "N/A",
          shoot_type: item.eventType,
          event_date: item.date,
          event_location: item.city,
          photography_requirements: item.requirements,
          status: item.status,
        }));

        setData(mappedData);

        /* ---------- Pagination ---------- */
        setTotalPages(Math.ceil(meta.total / meta.limit));
      }
    } catch (error) {
      console.error("Bookings fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page]);

  /* ================= HELPERS ================= */

  const handleGalleryUpload = (booking) => {
    navigate(`/bookings/gallery-upload/${booking.shoot_id}`, {
      state: { booking },
    });
  };

  const calculateDaysRemaining = (date) => {
    const diff = Math.ceil(
      (new Date(date) - new Date()) / (1000 * 60 * 60 * 24)
    );

    return diff > 0 ? `${diff} Days` : "Completed";
  };

  /* ================= PAGINATION ================= */

  const renderPagination = () => {
    let pages = [];

    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, start + 2);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={`page-btn ${page === i ? "active" : ""}`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  /* ================= LOADER ================= */

  if (loading) return <Loader />;

  /* ================= UI ================= */

  return (
    <>
    <div className="table-wrapper">
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Booking ID</th>
            <th>Client Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Event Type</th>
            <th>Date</th>
            <th>City</th>
            <th>Requirements</th>
            <th>Gallery</th>
            <th>Days Left</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.shootId}>
              <td>{(page - 1) * limit + index + 1}</td>
              <td>{item.shoot_id}</td>
              <td>{item.client_name}</td>
              <td>{item.client_email}</td>
              <td>{item.client_mobile}</td>
              <td>{item.shoot_type}</td>
              <td>
                {new Date(item.event_date).toLocaleDateString()}
              </td>
              <td>{item.event_location}</td>
              <td>{item.photography_requirements}</td>

              <td>
                <FiUpload
                  size={18}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleGalleryUpload(item)}
                />
              </td>

              <td>{calculateDaysRemaining(item.event_date)}</td>

              <td>
                <span className={`status status-${item.status}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>

              </td>

              <td>
                <FiEdit
                  size={16}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedBooking(item);
                    setShowEditModal(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      

     
    </div>

<div className="pagination">
    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
    >
      Prev
    </button>

    {renderPagination()}

    <button
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
    >
      Next
    </button>
  </div>


   {/* ================= EDIT MODAL ================= */}

      <EditBookingModal
        booking={selectedBooking}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={fetchBookings}
/>


    </>
  );
};

export default BookingsTable;
