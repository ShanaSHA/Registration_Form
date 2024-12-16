import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { otpValidationSchema } from '../../validation/otpValidation'; // Adjust the path
import { verifyOtpApi } from '../../Services/otpApi'; // Adjust the path
import { useNavigate } from 'react-router-dom';

function OTPVerification() {
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  const [timer, setTimer] = useState(5); // Default timer set to 30 seconds
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  // Timer for resend functionality
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // OTP verification
  const verifyOtp = async (otp, resetForm) => {
    setLoading(true);
    try {
      const response = await verifyOtpApi(otp, generatedOtp);
      if (response.success) {
        alert('OTP Verified Successfully!');
        resetForm(); // Clear the form fields after successful verification
        navigate('/contact'); // Redirect to contact page on success
      } else {
        alert('Invalid OTP. Please try again.');
        console.log(response);
      }
    } catch (error) {
      alert('Error verifying OTP. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = (resetForm) => {
    if (!canResend) return;

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpMessage('A new OTP has been sent.');
    setTimer(5); // Set timer back to 30 seconds for the next countdown
    setCanResend(false);
    console.log(newOtp);
    // Reset the form fields when OTP is resent
    resetForm();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-background">
      <div className="form-container  bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-center text-xl font-semibold mb-6">Verify OTP</h2>
        <Formik
          initialValues={{ otp: ['', '', '', '', '', ''] }}
          validationSchema={otpValidationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const otp = values.otp.join(''); // Combine OTP array into a single string
            await verifyOtp(otp, resetForm); // Pass resetForm to clear the form after submission
            setSubmitting(false);
          }}
        >
          {({ values, setFieldValue, isSubmitting, resetForm }) => (
            <Form>
              <div className="flex justify-center gap-2 mb-6">
                {values.otp.map((_, index) => (
                  <Field
                    key={index}
                    name={`otp[${index}]`}
                    type="text"
                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md"
                    maxLength="1"
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only digits
                      setFieldValue(`otp[${index}]`, value);
                      if (value && index < 5) {
                        document.getElementById(`otp-${index + 1}`).focus(); // Move focus to the next input
                      }
                    }}
                    id={`otp-${index}`}
                  />
                ))}
              </div>
              
              <div className="text-blue-600 mb-4">{otpMessage}</div>
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className={`text-xl px-6 py-2 ${
                  isSubmitting || loading ? 'bg-gray-300' : 'bg-blue-500'
                } text-white rounded-md mb-4`}
              >
                {loading ? 'Verifying...' : 'Submit OTP'}
              </button>
              <button
                type="button"
                onClick={() => handleResendOtp(resetForm)}
                disabled={!canResend}
                className={`text-blue-600 underline p-5${
                  !canResend ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {canResend ? 'Resend OTP' : `Resend in ${timer}s`}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default OTPVerification;
