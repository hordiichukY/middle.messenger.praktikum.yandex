export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export type UserProfile = Omit<User, 'id' | 'avatar'>;
export type UserFieldsKeys = keyof User;
export type ChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type AvatarChangeData = {
  avatar: File;
};

type RequestFailure =
  | {
      reason: string;
    }
  | string;

export type UserDataResponse = RequestFailure | User;
export type ChangePassResponse = RequestFailure | string;
export type UserSearchDataResponse = RequestFailure | User[];
