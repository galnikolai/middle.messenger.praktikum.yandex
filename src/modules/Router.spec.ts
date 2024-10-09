import { expect } from 'chai'
import { Routes, router } from './Router'
import Block from './Block'

class TestBlock extends Block {
  constructor(props: any) {
    super('div', props)
  }

  render() {
    return this.compile('<div></div>', this.props)
  }
}

describe('Роутер', () => {
  it('Добавляет маршрурты', function () {
    router.use(Routes.Messenger, TestBlock, {})
    expect(router.routes).to.have.lengthOf(1)
  })

  it('Использует маршрурты', function () {
    router.go(Routes.Messenger)
    expect(router.history.length).to.eq(2)
  })
})
