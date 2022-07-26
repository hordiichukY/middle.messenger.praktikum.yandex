import { AuthApi } from '../api/AuthAPI';
import Router from '../core/Router';
import Store from '../core/Store';
import { SignUpData, SignInData } from '../utils/types/authData';
import { navigation } from '../variables/navigation';

const { signIn, messenger } = navigation;

class AuthController {
  private api: AuthApi;
  constructor() {
    this.api = new AuthApi();
  }
  async signUp(data: SignUpData) {
    Store.set('currentUser.isLoading', true);

    try {
      const response = await this.api.signUp(data);
      if (response && typeof response !== 'string' && !('reason' in response)) {
        await this.getUser();
        Router.go(messenger.pathname);
      }
    } catch (e) {
      throw new Error(e?.reason);
    }

    Store.set('currentUser.isLoading', false);
  }

  async signIn(data: SignInData) {
    Store.set('currentUser.isLoading', true);
    try {
      await this.api.signIn(data);
      await this.getUser();
      Router.go(messenger.pathname);
    } catch (e) {
      throw new Error(e?.reason);
    }
  }

  async logout() {
    try {
      await this.api.logout();
      Router.go(signIn.pathname);
    } catch (e) {
      throw new Error(e);
    }
  }

  async getUser() {
    try {
      const user = await this.api.read();
      if (!('reason' in user)) {
        Store.set('currentUser', user);
      }
    } catch (e) {
      throw new Error(e?.reason);
    }
  }
}

export default new AuthController();
