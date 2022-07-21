import { Route } from './Route'

export class Router {
  private static __instance: Router

  private routes: Route[] = []
  private history: History = window.history
  private _currentRoute: Route | null = null

  constructor() {
    if (Router.__instance) {
      return Router.__instance
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    Router.__instance = this
  }

  // todo blockConstructor: BlockDerivedConstructor => fix ts
  use(pathname: string, blockConstructor: any) {
    const route = new Route(pathname, blockConstructor)
    this.routes.push(route)
    return this
  }

  start() {
    window.onpopstate = (event) => {
      this._onRoute((event.currentTarget as Window).location.pathname)
    }
    this._onRoute(window.location.pathname)
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname)
    if (this._currentRoute) {
      this._currentRoute.leave()
    }
    if (!route) {
      throw new Error('Route does not exist')
    }
    this._currentRoute = route
    route.render()
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }

  getRoute(pathname: string) {
    const route = this.routes.find((route) => route.match(pathname))
    return route || this.routes.find((route) => route.match('*'))
  }
}

export default new Router()
