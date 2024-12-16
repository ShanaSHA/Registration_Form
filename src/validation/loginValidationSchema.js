import * as Yup from 'yup';

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format.')
    .required('Email is required.'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long.')
    .matches(/\d/, 'Password must contain at least one digit.')
    .required('Password is required.'),
});

export default loginValidationSchema;
