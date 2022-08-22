import { User } from './userData';

export type SignUpData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignInData = {
  login: string;
  password: string;
};

type RequestFailure = {
  reason: string;
};

type RegistrationSuccess = {
  id: number;
};

export type LoginResponse = RequestFailure | string;
export type RegistrationResponse = RequestFailure | RegistrationSuccess;
export type UserResponse = RequestFailure | User;
