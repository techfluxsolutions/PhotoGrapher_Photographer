// import "./LatestQuotes.css";
// import { IoChevronForward } from "react-icons/io5";

// const LatestQuotes = () => {

//   const quotes = [
//     {
//       name: "Mansi Shah",
//       type: "Wedding Ceremony",
//       paymentType: "Full Payment",
//       amount: "₹30,000",
//       status: "Paid",
//     },
//     {
//       name: "Neha Deshpande",
//       type: "Fashion Shoot",
//       paymentType: "Partial Payment",
//       amount: "₹15,000",
//       status: "Partial",
//     },
//     {
//       name: "Mansi Shah",
//       type: "Wedding Ceremony",
//       paymentType: "Full Payment",
//       amount: "₹30,000",
//       status: "Paid",
//     },
//     {
//       name: "Neha Deshpande",
//       type: "Fashion Shoot",
//       paymentType: "Partial Payment",
//       amount: "₹15,000",
//       status: "Partial",
//     },
//   ];

//   return (
//     <div className="recent-payout-wrapper">
//       <h4 className="recent-title">Upcoming Shoot</h4>

//       {quotes.map((item, index) => (
//         <div key={index} className="payout-card">
          
//           {/* Left */}
//           <div>
//             <div className="payout-name">{item.name}</div>

//             <div className="payout-sub">
//               • {item.type}
//               <span className="dot">• {item.paymentType}</span>
//             </div>
//           </div>

//           {/* Right */}
//           <div className="payout-right">
//             <div className="payout-amount">{item.amount}</div>

//             <div
//               className={`payout-status ${
//                 item.status === "Paid" ? "paid" : "partial"
//               }`}
//             >
//               {item.status}
//             </div>

//             <IoChevronForward className="arrow-icon" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LatestQuotes;


import "./LatestQuotes.css";
import { IoChevronForward } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getUpcommingBookingAPI } from "../../../utils/APIs/dashboardApis";
import { useNavigate } from "react-router-dom";

const LatestQuotes = () => {
  const [quotes, setQuotes] = useState([]);
   const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  const  handleViewDetails = () =>{
    navigate(`/bookings`);
  }
  const handleArrow = (item)=>{
    console.log("Perticular booking",item)
navigate(`/bookings/${item._id}`);
  }
  useEffect(() => {
    fetchUpcomingBookings();
  }, []);

  const fetchUpcomingBookings = async () => {
    try {
      setLoading(true)
      const res = await getUpcommingBookingAPI(1, 5);

      if (res?.data?.success) {
        const formattedData = res.data.data.map((item) => ({
           _id: item._id, // ✅ ADD THIS
          name: item.clientName,
          type: item.eventType,
          paymentType: "Full Payment", // API doesn't provide → fallback
          amount: `₹${item.photographerAmount}`,
          status:
            item.status === "confirmed" ? "Paid" : "Partial", // mapping
        }));

        setQuotes(formattedData);
      }
    } catch (error) {
       setLoading(false)
      console.error("Error fetching bookings:", error);
    }
    finally{
       setLoading(false)
    }
  };

  return (
    <div className="recent-payout-wrapper">
      <h4 className="recent-title">Upcoming Shoot</h4>
     {!loading && quotes.length === 0 && <p>No Upcoming Shoot</p>}
 { quotes.length !== 0 &&(
      <div
        className="booking-id-link "
        onClick={() => handleViewDetails()}
        style={{textAlign:"right", marginBottom:"10px", position:"relative", right:"10px"}}
      >
       View More
      </div>
 )}
      {quotes.map((item, index) => (
        <div key={index} className="payout-card">
          
          {/* Left */}
          <div>
            <div className="payout-name">{item.name}</div>

            <div className="payout-sub">
              • {item.type}
              <span className="dot">• {item.paymentType}</span>
            </div>
          </div>

          {/* Right */}
          <div className="payout-right">
            <div className="payout-amount">{item.amount}</div>

            {/* <div
              className={`payout-status ${
                item.status === "Paid" ? "paid" : "partial"
              }`}
            >
              {item.status}
            </div> */}

            <IoChevronForward className="arrow-icon"  onClick={() => handleArrow(item)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestQuotes;
