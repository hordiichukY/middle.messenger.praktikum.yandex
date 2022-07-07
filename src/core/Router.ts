import { BlockDerivedConstructor, Route } from './Route'

export class Router {
  private static __instance: Router

  private _rootQuery: string
  private routes: Route[] = []
  private history: History = window.history
  private _currentRoute: Route | null = null

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this._rootQuery = rootQuery

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    Router.__instance = this
  }

  use(pathname: string, blockConstructor: BlockDerivedConstructor) {
    const route = new Route(pathname, blockConstructor, {
      rootQuery: this._rootQuery,
    })
    this.routes.push(route)
    return this
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname)
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
    return this.routes.find((route) => route.match(pathname))
  }
}
