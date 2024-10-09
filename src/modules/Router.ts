import { render } from '../utils/renderDOM'
import { BlockProps } from './Block'

function isEqual(lhs: any, rhs: any) {
  return lhs === rhs
}

export enum Routes {
  LogIn = '/',
  SignUp = '/sign-up',
  Messenger = '/messenger',
  Settings = '/settings',
  SettingsPassword = '/settings/password',
  NotFound = '/not-found',
  ServerError = '/server-error',
}
class Route {
  _pathname: string
  _blockClass: any
  _block: BlockProps | null
  _props: BlockProps
  _blockProps: BlockProps

  constructor(pathname: string, view: any, props: BlockProps, blockProps: BlockProps) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
    this._blockProps = blockProps
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave() {
    if (this._block) {
      this._block.hide()
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname)
  }

  render() {
    if (typeof this._blockClass !== 'function') {
      throw new Error(`_blockClass is not a valid constructor: ${this._blockClass}`)
    }
    this._block = new this._blockClass(this._blockProps)
    render(this._props.rootQuery, this._block)
    return
  }
}

export class Router {
  _currentRoute: string | undefined | any
  routes: Route[] = []
  _rootQuery: any
  history!: History
  static __instance: any

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = undefined
    this._rootQuery = rootQuery

    Router.__instance = this
  }

  use(pathname: string, block: any, blockProps: BlockProps) {
    const route: Route = new Route(pathname, block, { rootQuery: this._rootQuery }, blockProps)
    this.routes.push(route)
    return this
  }

  start() {
    window.onpopstate = (event: Event | any) => {
      if (event) {
        this._onRoute(event?.currentTarget?.location?.pathname)
      }
    }

    this._onRoute(window.location.pathname)
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname)

    if (this._currentRoute && !this.getRoute(this._currentRoute.match(pathname))) {
      this._currentRoute.leave()
    }

    if (!route) {
      this.go(Routes.NotFound)
      return
    }

    this._currentRoute = route
    route.render(route, pathname)
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

  getRoute(pathname: string): string | undefined | any {
    return this.routes.find((route: Route) => route.match(pathname))
  }
}

export const router = new Router('.app')
