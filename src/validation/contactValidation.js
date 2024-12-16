import * as Yup from 'yup';

// Define the validation schema for the contact form
const contactValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters long.')
    .required('Username is required.'),
  email: Yup.string()
    .email('Invalid email format.')
    .required('Email is required.'),
  Message: Yup.string()
    .min(20, 'Message must be at least 20 characters long.')
    .required('Message is required.'),
});

export default contactValidationSchema;
