import { nanoid } from "nanoid";
export const LoginInputsProps = [
  {
    type: 'text',
    name: 'login',
    placeholder: 'Enter login',
    required: 'required',
    error: 'Login is not correct',
    id: nanoid(6)
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'Enter password',
    required: 'required',
    error: 'Password is not correct',
    id: nanoid(6)
  },
];

export const RegistrtationInputProps = [
  {
    type: 'email',
    name: 'email',
    placeholder: 'Enter email',
    required: 'required',
    error: 'Email is not correct',
    id: nanoid(6)
  },
  {
    type: 'text',
    name: 'login',
    placeholder: 'Enter login',
    required: 'required',
    error: 'Login is not correct',
    id: nanoid(6)
  },
  {
    type: 'text',
    name: 'first_name',
    placeholder: 'Enter name',
    required: 'required',
    error: 'First name is not correct',
    id: nanoid(6)
  },
  {
    type: 'text',
    name: 'second_name',
    placeholder: 'Enter surname',
    required: 'required',
    error: 'Second name is not correct',
    id: nanoid(6)
  },
  {
    type: 'tel',
    name: 'phone',
    placeholder: 'Enter phone number',
    required: 'required',
    error: 'Invalid phone number',
    id: nanoid(6)
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'Enter password',
    required: 'required',
    error: 'Password is not correct',
    id: nanoid(6)
  },
  {
    type: 'password',
    name: 'retype',
    placeholder: 'Repeat password',
    required: 'required',
    error: 'Passwords do not match',
    id: nanoid(6)
  },
];

export const profileInputProps = [
  {
    id: 'email',
    label: 'Email',
    value: 'cat@gmail.com',
    type: 'email',
    name: 'email',
    placeholder: 'Enter email',
    required: 'required',
    error: 'Email is not correct',
    disabled: 'disabled' 
  },
  {
    id: 'login',
    label: 'Login',
    value: 'bestcat',
    type: 'text',
    name: 'login',
    placeholder: 'Enter login',
    required: 'required',
    error: 'Login is not correct',
    disabled: 'disabled'  
  },
  {
    id: 'first_name',
    label: 'Name',
    value: 'Miaw',
    type: 'text',
    name: 'first_name',
    placeholder: 'Enter name',
    required: 'required',
    error: 'First name is not correct',
    disabled: 'disabled'
  },
  {
    id: 'second_name',
    label: 'Surname',
    value: 'Mrrrr',
    type: 'text',
    name: 'second_name',
    placeholder: 'Enter surname',
    required: 'required',
    error: 'Second name is not correct',
    disabled: 'disabled'
  },
  {
    id: 'chat_name',
    label: 'Chat name',
    value: 'Cat',
    type: 'text',
    name: 'chat_name',
    placeholder: 'Enter your chat name',
    required: 'required',
    disabled: 'disabled'
  },
  {
    id: 'phone',
    label: 'Phone number',
    value: '+123456789',
    type: 'tel',
    name: 'phone',
    placeholder: 'Enter phone number',
    required: 'required',
    error: 'Invalid phone number',
    disabled: 'disabled'
  },
];

export const profilePasswordProps = [
  {
    type: 'password',
    name: 'old_password',
    placeholder: 'Enter password',
    required: 'required',
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'Enter password',
    required: 'required',
    error: 'Password is not correct',
  },
  {
    type: 'password',
    name: 'retype',
    placeholder: 'Repeat password',
    required: 'required',
    error: 'Passwords do not match',
  },
]