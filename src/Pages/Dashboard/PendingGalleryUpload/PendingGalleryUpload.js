import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { getGallerUploadPendingAPI } from '../../../utils/APIs/dashboardApis';
import { IoChevronForward } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const PendingGalleryUpload = () => {
    const [bookingRequest, setBookingRequest] = useState([]);
    const navigate = useNavigate();
        const [loading, setLoading] = useState(false);
        //  const navigate=useNavigate()
       useEffect(() => {
         fetchUpcomingBookings();
       }, []);

       
 
        const handleArrow = (item)=>{
   
 navigate(`/bookings/${item?._id}`);
   }
     
       const fetchUpcomingBookings = async () => {
         try {
           setLoading(true)
           const res = await getGallerUploadPendingAPI(1, 5);
     
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

        const  handleViewDetails = () =>{
    navigate(`/bookings`);
  }
 
     
   return (
      <div className="todays-shoot-wrapper">
       <h4 className="todays-title">Gallery Upload</h4>
    {!loading && bookingRequest.length === 0 && <p>No Gallery Upload</p>}
 { bookingRequest.length !== 0 &&(
      <div
        className="booking-id-link "
        onClick={() => handleViewDetails()}
        style={{textAlign:"right", marginBottom:"10px", position:"relative", right:"10px"}}
      >
       View More
      </div>
 )}
        {bookingRequest.map((item, index) => (
          <div key={index} className="shoot-card">
            
            {/* Left */}
            <div>
              <div className="payout-name">{item.bookingId} | {item.clientName}   </div>
                  <div>{item?.address}</div>
                  
              <div className="payout-sub">
                   <div >{item.date}</div>
                • {item.eventType}
                {/* <span className="dot">• {item.requirements}</span> */}
               
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
              onClick={() => handleArrow(item)} 
                 />
            </div>
          </div>
        ))}
      
 </div>
 
     
 
   
   )
 }
 


export default PendingGalleryUpload