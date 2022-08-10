import { Route } from './Route';
import Store from './Store';
import {
  authorizationPathnames,
  navigation,
  navigationProps,
} from '../variables/navigation';

export class Router {
  private static __instance: Router;

  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | null = null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    Router.__instance = this;
  }

  // todo blockConstructor: BlockDerivedConstructor => fix ts
  use(navigationProps: navigationProps, blockConstructor: any) {
    const route = new Route(navigationProps, blockConstructor);
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };
    const { pathname } = window.location;
    if (!this.redirectUser(pathname)) {
      this._onRoute(pathname);
    }
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    if (!route) {
      throw new Error('Route does not exist');
    }
    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    if (!this.isRouteAccessible(pathname)) {
      return;
    }
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    const route = this.routes.find((route) => route.match(pathname));
    return route || this.routes.find((route) => route.match('*'));
  }

  isRouteAccessible(pathname: string) {
    const route = this.getRoute(pathname);
    if (!this.hasUser() && route?.private) {
      return false;
    }

    return true;
  }

  redirectUser(pathname: string) {
    if (this.hasUser() && authorizationPathnames.includes(pathname)) {
      this.go(navigation.messenger.pathname);
      return true;
    }
    if (!this.isRouteAccessible(pathname)) {
      this.go(navigation.signIn.pathname);
      return true;
    }
    return false;
  }

  hasUser() {
    return Store.getState().currentUser ? true : false;
  }
}
