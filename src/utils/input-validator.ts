import { validateString } from "./string-validate";

export const nameRule = [
  { 
    required: true, 
    message: 'Please input your name!' 
  },
  {
    validator: (_: any, value: string) => validateString(value) ? Promise.resolve() : Promise.reject(new Error('The input is not valid name!'))
  }
];

export const emailRule = [
  {
    type: 'email',
    message: 'The input is not valid Email!',
  },
  {
    required: true,
    message: 'Please input your Email!',
  },
];

export const passwordRule = [
  {
    required: true,
    message: 'Please input your Password!',
  },
  {
    validator: (_: any, value: string | undefined) => validateString(value) ? Promise.resolve() : Promise.reject(new Error('The input is not valid password!'))
  }
]