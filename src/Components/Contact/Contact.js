import React from 'react';
import '../../index.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { submitContactForm } from '../../Services/contactService'; // Import the new API function
import contactValidationSchema from '../../validation/contactValidation'; // Import the validation schema

function Contact() {
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      Message: '',
    },
    validationSchema: contactValidationSchema, // Use the imported validation schema
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true);

      try {
        // Use the service function to submit form data
        const response = await submitContactForm(values);

        // Success response
        setStatus({ success: 'Submission successful!' });
        formik.resetForm(); // Reset form fields
        console.log('Response from API:', response);
      } catch (error) {
        setStatus({ error: 'Failed to submit. Please try again.' });
        console.error('Error:', error);
      }

      setSubmitting(false);
    },
  });

  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-background">
      <div className="form-container bg-white border-gray-300 shadow-lg rounded-lg p-5">
        <h2 className="text-center text-xl font-semibold mb-6">Contact Us</h2>
        <form className="registration-form border-gray-300" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Name:</label>
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

          <div className="form-group">
            <label htmlFor="Message">Message:</label>
            <textarea
              className="bg-gray-200 p-2 w-full border border-gray-300 rounded-md"
              id="Message"
              name="Message"
              rows="5" // Adjust for the desired height
              value={formik.values.Message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            ></textarea>
            {formik.touched.Message && formik.errors.Message && (
              <p className="text-red-500">{formik.errors.Message}</p>
            )}
          </div>

          {/* Display status messages (error or success) */}
          {formik.status?.error && <p className="text-red-500">{formik.status.error}</p>}
          {formik.status?.success && <p className="text-green-500">{formik.status.success}</p>}

          <div className="mt-8">
            <button
              type="submit"
              className="submit-button text-center text-xl font-semibold mb-8 px-6 py-2 bg-blue-500 text-white rounded-md mx-auto block"
              disabled={formik.isSubmitting} // Disable button when submitting
            >
              {formik.isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
