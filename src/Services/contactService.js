import api from './api'; // Import the axios instance from api.js

/**
 * Function to submit contact form data
 * @param {Object} data - Contact form data
 * @returns {Promise} - Axios promise with response data
 */
export const submitContactForm = async (data) => {
  try {
    const response = await api.post('/login', data); // Use the api instance for the POST request
    return response.data; // Return the response data from the API
  } catch (error) {
    throw error; // Throw error to be handled by the calling function
  }
};
