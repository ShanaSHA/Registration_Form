import * as Yup from 'yup';

// Yup validation schema for OTP
export const otpValidationSchema = Yup.object({
  otp: Yup.array()
    .of(
      Yup.string()
        .matches(/^\d$/, 'Only digits are allowed') // Ensures each input is a digit
        .required('Each field is required')
    )
    .min(6, 'OTP must be 6 digits') // Ensures the length is 6 digits
    .max(6, 'OTP must be 6 digits'),
});
