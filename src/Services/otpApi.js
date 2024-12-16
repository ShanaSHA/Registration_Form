import axios from 'axios';

// API call to verify OTP
export const verifyOtpApi = async (otp, generatedOtp) => {
  try {
    // Simulated API endpoint for OTP verification
    const response = await axios.post('https://6757c8b4c0a427baf94dc772.mockapi.io', {
      otp, // Send the entered OTP in the request body
    });

    // Simulate backend logic: assume backend sends a success flag
    const { success } = response.data;

    // Simulate verification of the entered OTP with the generated one
    if (otp === generatedOtp && success) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};
