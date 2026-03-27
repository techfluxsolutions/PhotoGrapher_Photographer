// import axios from 'axios';
import { authorizeMe, axiosInstance} from './commonHeadApiLogic.js';

// Ensure authorization header is set before making authenticated requests
const withAuthorization = async (apiFunction, ...args) => {
  try {
    await authorizeMe(); // Ensure the Authorization header is set
    return await apiFunction(...args);
  } catch (error) {
    // Handle errors as necessary
    console.error("Error in API request:", error);
    throw error;
  }
};



export const getTodaysBookingAPI = (page,limit) => {
    
  return withAuthorization(() =>
    axiosInstance.get(`/api/photographers/gettodaysbookings?page=${page}&limit=${limit}`)
  );
};


export const getUpcommingBookingAPI = (page = 1, limit = 10) => {
  return withAuthorization(() =>
    axiosInstance.get(`/api/mobile/photographer/bookings/upcoming?page=${page}&limit=${limit}`)
  );
};


// ✅ Send OTP
export const sendOtpAPI = (mobile,bookingId) =>{
    // console.log("first",booking)
     withAuthorization(() =>
    axiosInstance.post(`/api/photographers/bookings/${bookingId}/resend-otp`, { mobile })
  );
}
    
 

// ✅ Verify OTP
export const verifyOtpAPI = (mobile, otp,bookingId) =>
  withAuthorization(() =>
    axiosInstance.post(`/api/photographers/bookings/${bookingId}/verify-otp`, { mobile, otp })
  );


