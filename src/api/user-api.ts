import { User } from './auth-api'
import BaseAPI from './base-api'
export interface Avatar {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  password: string
  phone: string
  avatar: string
}

export interface UserInfo {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export interface Password {
  oldPassword: 'string'
  newPassword: 'string'
}
export class UserAPI extends BaseAPI {
  constructor() {
    super('/user')
  }

  getUser(): any {
    return this.http.get('/user')
  }

  searchUsers(data: { login: string }): any {
    return this.http.post('/search', {
      data,
    })
  }

  setUser(data: User | undefined): any {
    return this.http.put('/profile', { data })
  }

  changeAvatar(data: FormData): any {
    return this.http.put('/profile/avatar', { data, content_type: 'multipart/form-data' })
  }

  changePassword(data: Password | undefined): any {
    if (data) {
      const { oldPassword, newPassword } = data
      return this.http.put('/password', { data: { oldPassword, newPassword } })
    }

    return null
  }

  create = undefined
  update = undefined
  delete = undefined
  read = undefined
}

export const userApi = new UserAPI()
