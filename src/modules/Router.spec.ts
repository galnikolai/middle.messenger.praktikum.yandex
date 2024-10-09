import { expect } from 'chai'
import { Router, Routes } from './Router'
import Block from './Block'

import { JSDOM } from 'jsdom'
import Sinon from 'sinon'

class TestBlock extends Block {
  render() {
    return this.compile('<div></div>', this.props)
  }
}

const testBlock = new TestBlock()

describe('Роутер', () => {
  beforeEach(function () {
    const { window } = new JSDOM('<!doctype html><html><body></body></html>', {
      url: 'http://localhost:3000',
    })

    ;(global.window as unknown) = window
    global.document = window.document
    global.DocumentFragment = window.DocumentFragment
    ;(global.XMLHttpRequest as unknown) = Sinon.useFakeXMLHttpRequest()

    this.router = new Router('#app')
  })

  it('Добавляет маршрурты', function () {
    this.router.use(Routes.Messenger, testBlock, {})
    expect(this.router.routes).to.have.lengthOf(1)
  })

  // it('Использует маршрурты', function () {
  //   this.router.go(Routes.Messenger)
  //   expect(this.router.history.length).to.have.lengthOf(1)
  // })

  // it('Переход на новую страницу должен менять состояние сущности history', () => {
  //   // router.go(Routes.LogIn)
  //   // router.go(Routes.SignUp)
  //   // router.go(Routes.Messenger)
  //   // router.go(Routes.Settings)
  //   // router.go(Routes.SettingsPassword)

  //   expect(window.history.length).to.eq(6)
  // })
})
