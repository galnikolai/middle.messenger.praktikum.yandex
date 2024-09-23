import BaseAPI from './base-api'

export interface SigninData {
  login: string
  password: string
}

export interface SignupData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  password: string
  phone: string
  avatar: string
  reason?: string
}

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth')
  }

  async signup(data: SignupData): Promise<{ id: number }> {
    return this.http.post('/signup', { data })
  }

  async login(data: SigninData): Promise<null> {
    return this.http.post('/signin', { data })
  }

  async logout() {
    return this.http.post('/logout')
  }

  async read(): Promise<User> {
    return this.http.get('/user')
  }

  create = undefined
  update = undefined
  delete = undefined
}
