import React from 'react';
import '../../index.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { fetchUsers } from '../../Services/userService';
// Import the validation schema

 import loginValidationSchema from '../../validation/loginValidationSchema';
function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema, // Use the validation schema from the separate file
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true);

      try {
        console.log('Fetching users...');
        const users = await fetchUsers();
        console.log(users);
        
        const user = users.find((user) => user.email === values.email);
        if (!user) {
          setStatus({ error: 'User not found.' });
          setSubmitting(false);
          return;
        }

        if (user.password === values.password) {
          setStatus({ success: 'Login Successful!' });
          setTimeout(() => {
            navigate('/otp');
          }, 3000);
        } else {
          setStatus({ error: 'Incorrect password.' });
        }
      } catch (error) {
        setStatus({ error: 'Failed to fetch users. Please try again.' });
        console.error('Error:', error);
      }
 
      setSubmitting(false);
    },
  });

  const handleNavigate = () => {
    navigate('signup');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-hero-pattern">
      <div className="form-container bg-white border-gray-300 p-8 shadow-lg rounded-lg">
        <h2 className="text-center text-xl font-semibold mb-6">Login</h2>
        <form className="registration-form" onSubmit={formik.handleSubmit}>
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

          {formik.status?.error && <p className="text-red-500">{formik.status.error}</p>}
          {formik.status?.success && <p className="text-green-500">{formik.status.success}</p>}

          <div className="mt-8">
            <button
              type="submit"
              className="submit-button text-center text-xl font-semibold mb-8 px-6 py-2 bg-blue-500 text-white rounded-md mx-auto block"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <h2>
            Create an account?{' '}
            <button className="text-blue-400" onClick={handleNavigate}>
              Signup here
            </button>
          </h2>
        </form>
      </div>
    </div>
  );
}

export default Login;
