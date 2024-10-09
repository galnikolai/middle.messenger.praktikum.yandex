import { User } from '../api/auth-api'
import { userApi } from '../api/user-api'
import { store } from '../modules/Store'

export class UserController {
  public saveUser() {
    userApi
      .setUser(store.getState().user)
      .then((data: XMLHttpRequest) => {
        const { response }: { response: User } = data

        if (response?.reason) {
          throw new Error(response.reason)
        }

        store.set('user', response)
      })
      .catch((error: any) => {
        console.error('Error caught in promise chain:', error.message)
      })
  }

  public changeAvatar(avatar: FormData) {
    userApi
      .changeAvatar(avatar)
      .then((data: XMLHttpRequest) => {
        const { response }: { response: User } = data

        if (response?.reason) {
          throw new Error(response.reason)
        }

        store.set('user', response)
      })
      .catch((error: any) => {
        console.error('Error caught in promise chain:', error.message)
      })
  }

  public changePassword() {
    userApi
      ?.changePassword(store.getState().password)
      ?.then((data: XMLHttpRequest) => {
        const { response }: { response: User } = data

        if (response?.reason) {
          throw new Error(response.reason)
        }

        store.set('user', response)
      })
      .catch((error: any) => {
        console.error('Error caught in promise chain:', error.message)
      })
  }

  public searchUsers(login: string) {
    userApi
      .searchUsers({ login })
      .then((data: XMLHttpRequest) => {
        const { response }: { response: User } = data

        if (response?.reason) {
          throw new Error(response.reason)
        }

        store.set('users', response)
      })
      .catch((error: any) => {
        console.log('Error caught in promis e chain:', error.message)
      })
  }

  public setUserProperty(key: string, value: string) {
    store.set(`user.${key}`, value)
  }
}

export const userController = new UserController()
