import { render } from '../utils/renderDOM'

function isEqual(lhs: any, rhs: any) {
  return lhs === rhs
}

export enum Routes {
  LogIn = '/',
  SignUp = '/sign-up',
  Messenger = '/messenger',
}
class Route {
  _pathname: string
  _blockClass: any
  _block: any
  _props: any
  _blockProps: any

  constructor(pathname: string, view: any, props: any, blockProps: any) {
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
    // if (!this._block) {
    this._block = new this._blockClass(this._blockProps)

    render(this._props.rootQuery, this._block)
    return
    // }

    // this._block.show()
  }
}

class Router {
  _currentRoute: any
  routes: any
  _rootQuery: any
  history: any
  static __instance: any

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    Router.__instance = this
  }

  use(pathname: string, block: any, blockProps: any) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery }, blockProps)
    this.routes.push(route)
    return this
  }

  start() {
    window.onpopstate = (event: any) => {
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

    this._currentRoute = route
    route.render(route, pathname)
  }

  go(pathname: string) {
    history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back() {
    history.back()
  }

  forward() {
    history.forward()
  }

  getRoute(pathname: string) {
    return this.routes.find((route: any) => route.match(pathname))
  }
}

export const router = new Router('.app')
