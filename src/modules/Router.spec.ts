import { expect } from 'chai'

import { Router, Routes } from './Router'
import { BlockProps } from './Block'

// Моковые классы для компонентов
class MockBlock {
  hidden: boolean
  props: BlockProps

  constructor(props: BlockProps) {
    this.props = props
    this.hidden = false
  }
  hide() {
    this.hidden = true
  }
}

describe('Router', () => {
  let router: Router

  beforeEach(() => {
    router = new Router('.app')
    router.history.pushState = (_, __, path) => {
      router._onRoute(path)
    }
  })

  it('use: должен регистрировать маршруты', () => {
    router.use(Routes.LogIn, MockBlock, {})
    router.use(Routes.SignUp, MockBlock, {})

    expect(router.routes.length).to.equal(2)
    expect(router.routes[0]._pathname).to.equal(Routes.LogIn)
    expect(router.routes[1]._pathname).to.equal(Routes.SignUp)
  })

  it('start: должен инициализировать первый маршрут', () => {
    router.use(Routes.LogIn, MockBlock, {})
    router.start()

    expect(router._currentRoute._pathname).to.equal(Routes.LogIn)
  })

  it('go: должен переходить на другой маршрут', () => {
    router.use(Routes.LogIn, MockBlock, {})
    router.use(Routes.SignUp, MockBlock, {})
    router.start()

    router.go(Routes.SignUp)

    expect(router._currentRoute._pathname).to.equal(Routes.SignUp)
  })

  it('getRoute: должен находить маршрут по заданному пути', () => {
    router.use(Routes.LogIn, MockBlock, {})
    router.use(Routes.SignUp, MockBlock, {})

    const route = router.getRoute(Routes.SignUp)
    expect(route._pathname).to.equal(Routes.SignUp)
  })

  it('not found: должен использовать маршрут NotFound, если маршрут не найден', () => {
    router.use(Routes.NotFound, MockBlock, {})
    router.start()

    router.go('/unknown-path')

    expect(router._currentRoute._pathname).to.equal(Routes.NotFound)
  })

  // it('должен корректно управлять историей навигации', () => {
  //   router.use(Routes.LogIn, MockBlock, {})
  //   router.use(Routes.SignUp, MockBlock, {})
  //   router.start()

  //   router.go(Routes.SignUp)
  //   expect(router._currentRoute._pathname).to.equal(Routes.SignUp)

  //   router.back()
  //   expect(router._currentRoute._pathname).to.equal(Routes.LogIn)

  //   router.forward()
  //   expect(router._currentRoute._pathname).to.equal(Routes.SignUp)
  // })

  // it('должен вызывать метод leave() при переходе на другой маршрут', () => {
  //   const mockBlock = new MockBlock({})
  //   router.use(Routes.LogIn, MockBlock, {})
  //   router.use(Routes.SignUp, () => mockBlock, {})
  //   router.start()

  //   router.go(Routes.SignUp)

  //   expect(mockBlock.hidden).to.be.true
  // })
})
