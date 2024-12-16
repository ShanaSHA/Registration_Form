import * as Yup from 'yup';

const signupValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters long.')
    .required('Username is required.'),
  email: Yup.string()
    .email('Invalid email format.')
    .required('Email is required.'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long.')
    .matches(/\d/, 'Password must contain at least one digit.')
    .required('Password is required.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password and Confirm Password must match.')
    .required('Confirm Password is required.'),
});

export default signupValidationSchema;
