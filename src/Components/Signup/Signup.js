import React from 'react';
import '../../index.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerUser } from '../../Services/userService'; // Import the API function
import signupValidationSchema from '../../validation/signupValidation'; // Import the validation schema

function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupValidationSchema, // Use the validation schema from the separate file
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true);

      try {
        // Call the registerUser API function
        const response = await registerUser(values);

        // Handle success
        setStatus({ success: 'Registration Successful!' });
        formik.resetForm();
        setTimeout(() => {
          navigate('/');
        }, 3000);
        console.log('Response from API:', response);
      } catch (error) {
        // Handle error (e.g., duplicate email)
        if (error.response && error.response.data.error === 'Email already exists') {
          setStatus({ error: 'Email already exists. Please use a different email.' });
        } else {
          setStatus({ error: 'Failed to register. Please try again.' });
        }
      }

      setSubmitting(false);
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-hero-pattern">
      <div className="form-container bg-white border-gray-300 shadow-lg rounded-lg p-5">
        <h2 className="text-center text-xl font-semibold mb-6">Signup</h2>
        <form className="registration-form" onSubmit={formik.handleSubmit}>
          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              className="bg-gray-200 p-2 w-full border border-gray-300 rounded-md"
              type="text"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500">{formik.errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              className="bg-gray-200 p-2 w-full border border-gray-300 rounded-md"
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              className="bg-gray-200 p-2 w-full border border-gray-300 rounded-md"
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              className="bg-gray-200 p-2 w-full border border-gray-300 rounded-md"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500">{formik.errors.confirmPassword}</p>
            )}
          </div>

          {/* Status Messages */}
          {formik.status?.error && <p className="text-red-500">{formik.status.error}</p>}
          {formik.status?.success && <p className="text-green-500">{formik.status.success}</p>}

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="submit-button text-center text-xl font-semibold mb-8 px-6 py-2 bg-blue-500 text-white rounded-md mx-auto block"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Signing Up...' : 'Signup'}
            </button>
          </div>

          {/* Navigate to Login */}
          <h2>
            Already have an account?{' '}
            <button className="text-blue-400" onClick={() => navigate('/')}>
              Login here
            </button>
          </h2>
        </form>
      </div>
    </div>
  );
}

export default Signup;
