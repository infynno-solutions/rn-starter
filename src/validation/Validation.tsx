import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email field is requied'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
    )
    .required('Password field is required'),
});
