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





export async function getSubscriptionEmployerAPI(token) {
  return axiosInstance.get("/api/admin/subscription-plans", {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    },
  });
}




export async function patchSubscriptionEmployerAPI(token, planId, body) {
  return axiosInstance.patch(
    `/api/admin/subscription-plans/${planId}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    }
  );
}


export async function getSubscriptionContractorAPI(token) {
  return axiosInstance.get("/api/admin/booster-plans", {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    },
  });
}


export async function patchSubscriptionContractorAPI(token, planId, body) {
  return axiosInstance.patch(
    `/api/admin/booster-plans/${planId}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    }
  );
}
