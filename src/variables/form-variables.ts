import { nanoid } from 'nanoid'
import { FormInputProps } from '../components/ui-form/form-input'

export const LoginInputsProps: FormInputProps[] = [
  {
    type: 'text',
    name: 'login',
    placeholder: 'Enter login',
    required: 'required',
    error: 'Login is not correct',
    id: nanoid(6),
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'Enter password',
    required: 'required',
    error: 'Password is not correct',
    id: nanoid(6),
  },
]

export const RegistrtationInputProps: FormInputProps[] = [
  {
    type: 'email',
    name: 'email',
    placeholder: 'Enter email',
    required: 'required',
    error: 'Email is not correct',
    id: nanoid(6),
  },
  {
    type: 'text',
    name: 'login',
    placeholder: 'Enter login',
    required: 'required',
    error: 'Login is not correct',
    id: nanoid(6),
  },
  {
    type: 'text',
    name: 'first_name',
    placeholder: 'Enter name',
    required: 'required',
    error: 'First name is not correct',
    id: nanoid(6),
  },
  {
    type: 'text',
    name: 'second_name',
    placeholder: 'Enter surname',
    required: 'required',
    error: 'Second name is not correct',
    id: nanoid(6),
  },
  {
    type: 'tel',
    name: 'phone',
    placeholder: 'Enter phone number',
    required: 'required',
    error: 'Invalid phone number',
    id: nanoid(6),
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'Enter password',
    required: 'required',
    error: 'Password is not correct',
    id: nanoid(6),
  },
  {
    type: 'password',
    name: 'retype',
    placeholder: 'Repeat password',
    required: 'required',
    error: 'Passwords do not match',
    id: nanoid(6),
  },
]

export const profileInputProps = [
  {
    id: nanoid(6),
    label: 'Email',
    type: 'email',
    name: 'email',
    placeholder: 'Enter email',
    required: 'required',
    error: 'Email is not correct',
    disabled: 'disabled',
  },
  {
    id: nanoid(6),
    label: 'Login',
    type: 'text',
    name: 'login',
    placeholder: 'Enter login',
    required: 'required',
    error: 'Login is not correct',
    disabled: 'disabled',
  },
  {
    id: nanoid(6),
    label: 'Name',
    type: 'text',
    name: 'first_name',
    placeholder: 'Enter name',
    required: 'required',
    error: 'First name is not correct',
    disabled: 'disabled',
  },
  {
    id: nanoid(6),
    label: 'Surname',
    type: 'text',
    name: 'second_name',
    placeholder: 'Enter surname',
    required: 'required',
    error: 'Second name is not correct',
    disabled: 'disabled',
  },
  {
    id: nanoid(6),
    label: 'Chat name',
    type: 'text',
    name: 'display_name',
    placeholder: 'Enter your chat name',
    required: 'required',
    disabled: 'disabled',
  },
  {
    id: nanoid(6),
    label: 'Phone number',
    type: 'tel',
    name: 'phone',
    placeholder: 'Enter phone number',
    required: 'required',
    error: 'Invalid phone number',
    disabled: 'disabled',
  },
]

export const profilePasswordProps = [
  {
    type: 'password',
    label: 'Old password',
    id: nanoid(6),
    name: 'oldPassword',
    placeholder: 'Enter old password',
    required: 'required',
    disabled: '',
  },
  {
    type: 'password',
    label: 'New password',
    id: nanoid(6),
    name: 'newPassword',
    placeholder: 'Enter new password',
    required: 'required',
    error: 'Password is not correct',
    disabled: '',
  },
  {
    type: 'password',
    label: 'Retype new password',
    id: nanoid(6),
    name: 'retype',
    placeholder: 'Retype new password',
    required: 'required',
    error: 'Passwords do not match',
    disabled: '',
  },
]
