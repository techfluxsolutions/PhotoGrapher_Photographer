import React, { useEffect, useState } from 'react'
import { getPendingBookings } from '../../../utils/APIs/bookingsApis';
import { IoChevronForward } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const BookingRequest = () => {
      const [bookingRequest, setBookingRequest] = useState([]);
       const [loading, setLoading] = useState(false);
        const navigate=useNavigate()
      useEffect(() => {
        fetchUpcomingBookings();
      }, []);

       const handleArrow = ()=>{
  
navigate(`/bookingRequest`);
  }
    
      const fetchUpcomingBookings = async () => {
        try {
          setLoading(true)
          const res = await getPendingBookings(1, 5);
    
          if (res?.data?.success) {
            // const formattedData = res.data.data.map((item) => ({
            //    _id: item._id, // ✅ ADD THIS
            //   name: item.clientName,
            //   type: item.eventType,
            //   paymentType: "Full Payment", // API doesn't provide → fallback
            //   amount: `₹${item.photographerAmount}`,
            //   status:
            //     item.status === "confirmed" ? "Paid" : "Partial", // mapping
            // }));
    
            setBookingRequest(res?.data?.data?.bookings);
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
     <div className="todays-shoot-wrapper">
      <h4 className="todays-title">Booking Request</h4>
   {!loading && bookingRequest.length === 0 && <p>No Booking Request</p>}
 
       {bookingRequest.map((item, index) => (
         <div key={index} className="payout-card">
           
           {/* Left */}
           <div>
             <div className="payout-name">{item.clientName}</div>
                 <div>{item?.address}</div>
                 
             <div className="payout-sub">
                  <div >{item.date}</div>
               • {item.eventType}
               <span className="dot">• {item.requirements}</span>
              
             </div>
           </div>
 
           {/* Right */}
           <div className="payout-right">
             <div className="payout-amount">₹ {item.budget}</div>
 
             {/* <div
               className={`payout-status ${
                 item.status === "Paid" ? "paid" : "partial"
               }`}
             >
               {item.status}
             </div> */}
 
             <IoChevronForward className="arrow-icon"  
             onClick={() => handleArrow()} 
                />
           </div>
         </div>
       ))}
     
</div>

    

  
  )
}

export default BookingRequest