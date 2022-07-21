import { HTTPTransport } from '../core/htttpTransport'
import { BaseAPI } from './BaseAPI'
import { API } from '../variables/api'
import {
  SignUpData,
  SignInData,
  LoginResponse,
  RegistrationResponse,
  UserResponse,
} from '../utils/types/authData'

const AuthAPIInstance = new HTTPTransport(API.AUTH)
const defaultHeader = { 'Content-Type': 'application/json' }

export class AuthApi extends BaseAPI {
  signUp(data: SignUpData) {
    return AuthAPIInstance.post<RegistrationResponse>(API.SIGNUP, {
      headers: defaultHeader,
      data,
    })
  }

  signIn(data: SignInData) {
    return AuthAPIInstance.post<LoginResponse>(API.SIGNIN, {
      headers: defaultHeader,
      data,
    })
  }

  logout() {
    return AuthAPIInstance.post<string>(API.LOGOUT)
  }

  read() {
    return AuthAPIInstance.get<UserResponse>(API.USER)
  }

  create = undefined
  request = undefined
  update = undefined
  delete = undefined
}
