import { HTTPTransport } from '../core/htttpTransport';
import { API } from '../variables/api';
import { BaseAPI } from './BaseAPI';
import {
  ChangePasswordData,
  UserProfile,
  UserDataResponse,
  UserSearchDataResponse,
} from '../utils/types/userData';

const UserAPI = new HTTPTransport(API.USER);
const defaultHeader = { 'Content-Type': 'application/json' };

export class UserApi extends BaseAPI {
  changeProfileData(data: UserProfile) {
    return UserAPI.put<UserDataResponse>(API.PROFILE, {
      headers: defaultHeader,
      data,
    });
  }

  changePassword(data: ChangePasswordData) {
    return UserAPI.put<string>(API.PASSWORD, {
      headers: defaultHeader,
      data,
    });
  }

  changeAvatar(data: any) {
    return UserAPI.put<UserDataResponse>(API.AVATAR, {
      data,
    });
  }

  getUserById(id: number) {
    return UserAPI.get<UserDataResponse>(`${API.USER}/${id}`);
  }

  searchUser(login: string) {
    return UserAPI.post<UserSearchDataResponse>(`${API.SEARCH}`, {
      data: { login },
      headers: defaultHeader,
    });
  }
}
