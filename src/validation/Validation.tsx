import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email field is requied'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password field is required'),
});
