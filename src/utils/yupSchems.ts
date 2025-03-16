import * as yup from 'yup';
import { User } from '../types/types';

export const yupSchema: yup.ObjectSchema<User> = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z][a-z0-9_-]{1,19}$/, {
      message: 'Validate for first uppercase letter',
    })
    .defined(),
  age: yup.number().min(0, 'Should be number, no negative values').defined(),
  email: yup.string().email().required().defined(),
  password: yup
    .string()
    .min(4)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/,
      {
        message:
          'The password must contain 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character.',
      }
    )
    .oneOf(
      [yup.ref('confirmPassword')],
      'Password and confirm Password must be the same'
    )
    .required()
    .defined(),
  confirmPassword: yup
    .string()
    .min(4)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/,
      {
        message:
          'The password must contain 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character.',
      }
    )
    .oneOf(
      [yup.ref('password')],
      'Password and confirm Password must be the same'
    )
    .required()
    .defined(),
  gender: yup.string().required().defined(),
  termCondition: yup
    .string()
    .matches(/ok/, { message: 'Confirm the conditions' })
    .required()
    .defined(),
  img: yup
    .mixed()
    .test('fileSize', 'Image size must be less than 3MB', (value) => {
      if (!value || !(value instanceof File)) return true;
      return value.size <= 3 * 1024 * 1024;
    })
    .test('fileType', 'Only .png and .jpeg are allowed', (value) => {
      if (!value || !(value instanceof File)) return true;
      return ['image/png', 'image/jpeg'].includes(value.type);
    })
    .required(),
  country: yup.string().defined(),
});
