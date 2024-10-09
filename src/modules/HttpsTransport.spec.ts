import { expect } from 'chai'

import BaseAPI from '../api/base-api'
import { SignupData } from '../api/auth-api'

class MockBlock extends BaseAPI {
  constructor() {
    super('')
  }

  async signup(data: SignupData): Promise<{ id: number }> {
    return this.http.post('/auth/signup', { data })
  }

  async users(data: { chatId: string }): Promise<{ id: number }> {
    return this.http.put('/chats/users', { data })
  }

  async deleteChat(data: { chatId: string }) {
    return this.http.delete('/chats', {
      data,
    })
  }

  async createChat(data: { title: string }) {
    return this.http.post('/chats', {
      data,
    })
  }

  async getChats() {
    return this.http.get('/chats', {})
  }

  create = undefined
  update = undefined
  delete = undefined
  read = undefined
}
describe('HTTPTransport', () => {
  const api = new MockBlock()
  let chatId = ''
  it('post: регистрация', async () => {
    try {
      const { response }: any = await api.signup({
        first_name: 'John',
        second_name: 'Doe',
        login: `johndoe${Date.now()}`,
        email: `johndoe${Date.now()}@example.com`,
        password: 'password123',
        phone: '1234567890123',
      })

      expect(response).to.be.an('object')
      expect(response).to.have.property('id')
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error response:', error.message)
      }
      if (error instanceof Error && 'response' in error) {
        console.error('Full error response:', (error as any).response)
      }
    }
  })

  it('post: создание чата', async () => {
    try {
      const { response }: any = await api.createChat({ title: 'Qwertyuiop' })

      expect(response).to.be.an('object')
      expect(response).to.have.property('id')
      chatId = response.id
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error response:', error.message)
      }
      if (error instanceof Error && 'response' in error) {
        console.error('Full error response:', (error as any).response)
      }
    }
  })

  it('put: пустой список участников', async () => {
    try {
      const { response }: any = await api.users({ chatId: chatId })
      expect(response).to.be.an('null')
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error response:', error.message)
      }
      if (error instanceof Error && 'response' in error) {
        console.error('Full error response:', (error as any).response)
      }
    }
  })

  it('get: список чатов', async () => {
    try {
      const { response }: any = await api.getChats()
      expect(response).to.be.an('array')
      expect(response).to.have.lengthOf(1)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error response:', error.message)
      }
      if (error instanceof Error && 'response' in error) {
        console.error('Full error response:', (error as any).response)
      }
    }
  })

  it('delete: удаление чата', async () => {
    try {
      const { response }: any = await api.deleteChat({ chatId })

      expect(response).to.be.an('object')
      expect(Object.keys(response).length).to.eq(2)
      expect(response).to.have.property('userId')
      expect(response).to.have.property('result')
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error response:', error.message)
      }
      if (error instanceof Error && 'response' in error) {
        console.error('Full error response:', (error as any).response)
      }
    }
  })
})
