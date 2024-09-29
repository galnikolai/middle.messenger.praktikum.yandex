import { AuthAPI, SigninData, SignupData, User } from '../api/auth-api'
import { Routes, router } from '../modules/Router'
import { store } from '../modules/Store'

export class AuthController {
  api: any
  constructor() {
    this.api = new AuthAPI()
  }

  public async signup(credentials: SignupData) {
    try {
      const data: XMLHttpRequest = await this.api.signup(credentials)

      if (data?.response?.reason) {
        throw new Error(data?.response?.reason)
      }

      router.go(Routes.Messenger)
    } catch (error) {
      alert(error)
    }
  }

  public async login(credentials: SigninData) {
    try {
      const data: XMLHttpRequest = await this.api.login(credentials)

      if (data?.response?.reason === 'User already in system') {
        router.go(Routes.Messenger)
        return
      }

      if (data?.response?.reason) {
        throw new Error(data?.response?.reason)
      }

      router.go(Routes.Messenger)
    } catch (error) {
      alert(error)
    }
  }

  public async logout() {
    try {
      const data: XMLHttpRequest = await this.api.logout()
      const { response } = data
      if (response?.reason) {
        throw new Error(data.response)
      }

      router.go(Routes.LogIn)
    } catch (error) {
      alert(error)
    }
  }

  public async getUser() {
    try {
      const data: XMLHttpRequest = await this.api.read()
      const { response }: { response: User } = data

      const authRoutes =
        document.location.pathname === '/' || document.location.pathname === '/sign-up'

      if (!response?.reason && authRoutes) {
        router.go(Routes.Messenger)
      }

      if (response?.reason === 'Cookie is not valid' && !authRoutes) {
        router.go(Routes.LogIn)
      }

      if (response?.reason) {
        throw new Error(response?.reason)
      }

      store.set('user', response)
    } catch (error) {
      // alert(error)
    }
  }
}

export const authController = new AuthController()
