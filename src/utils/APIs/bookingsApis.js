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




export const getAcceptedBookings = (page = 1, limit = 10) => {
  return withAuthorization(async () => {
    return await axiosInstance.get(
      `/api/photographers/bookings/accepted?page=${page}&limit=${limit}`
    );
  });
};

export const getCalenderBookings = (page = 1, limit = 10) => {
  return withAuthorization(async () => {
    return await axiosInstance.get(
      `/api/photographers/bookings/all?page=${page}&limit=${limit}`
    );
  });
};

export const getPendingBookings = (page = 1, limit = 10) => {
  return withAuthorization(async () => {
    return await axiosInstance.get(
      `/api/photographers/bookings/pending?page=${page}&limit=${limit}`
    );
  });
};
export const getBookingHistory = (page = 1, limit = 10) => {
  return withAuthorization(async () => {
    return await axiosInstance.get(
      `/api/photographers/bookings/completed?page=${page}&limit=${limit}`
    );
  });
};

export const updateBookingStatus = (bookingId, payload) => {
  return withAuthorization(async () => {
    return await axiosInstance.put(
      `/api/photographers/bookings/${bookingId}`,
      payload
    );
  });
};


export const acceptBookingRequest = (bookingId, payload) => {
  return withAuthorization(async () => {
    return await axiosInstance.patch(
      `/api/photographers/bookings/${bookingId}/status`,
      payload
    );
  });
};

export const getAcceptedBookingById = (bookingId) => {
  return withAuthorization(async () => {
    return await axiosInstance.get(
      `/api/photographers/bookings/${bookingId}`
    );
  });
};

export const cancelBooking = (bookingId) => {
  return withAuthorization(async () => {
    return await axiosInstance.delete(
      `/api/photographers/bookings/${bookingId}`
    );
  });
};

export const getPreviousBookingsAPI = (
  fromDate,
  toDate,
  page = 1,
  limit = 5
) => {
  return withAuthorization(async () => {
    return axiosInstance.get(
      `/api/admins/bookings/previous`,
      {
        params: {
          fromDate,
          toDate,
          page,
          limit,
        },
      }
    );
  });
};
