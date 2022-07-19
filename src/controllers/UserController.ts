import { UserApi } from '../api/UserAPI'
import { ChangePasswordData, UserProfile } from '../utils/types/userData'
import Store from '../core/Store'

class UserController {
  private api: UserApi
  constructor() {
    this.api = new UserApi()
  }

  async changeProfileData(data: UserProfile) {
    try {
      const response = await this.api.changeProfileData(data)
      if (response && typeof response !== 'string' && !('reason' in response)) {
        Store.set('currentUser', response)
        return response
      }
    } catch (e) {
      throw new Error(e?.reason)
    }
  }

  async changePassword(data: ChangePasswordData) {
    try {
      const response = await this.api.changePassword(data)
      if (response === 'OK') {
        // do sth
      }
    } catch (e) {
      throw new Error(e?.reason)
    }
  }

  async changeAvatar(data: FormData) {
    try {
      const response = await this.api.changeAvatar(data)

      if (response && typeof response === 'object' && !('reason' in response)) {
        Store.set('currentUser', response)
      }
    } catch (e) {
      throw new Error(e?.reason)
    }
  }

  async getUserById(id: number) {
    try {
      const response = await this.api.getUserById(id)
      if (response && typeof response !== 'string' && !('reason' in response)) {
        // do sth
      }
    } catch (e) {
      throw new Error(e?.reason)
    }
  }

  async searchUser(login: string) {
    try {
      const response = await this.api.searchUser(login)
      if (response && typeof response !== 'string' && !('reason' in response)) {
        // do sth
      }
    } catch (e) {
      throw new Error(e?.reason)
    }
  }
}

export default new UserController()
