import axios from 'axios';
import { authorizeMe, axiosInstance, axiosInstanceNoAuth } from './commonHeadApiLogic.js';

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



export async function getSubscribersEmployerAPI(token, page = 1) {
  return axiosInstance.get(
    `/api/admin/billing-history?page=${page}&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    }
  );
}


export async function getSubscribersContractorAPI(token, page = 1) {
  return axiosInstance.get(
    `/api/admin/boosters?page=${page}&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    }
  );
}







