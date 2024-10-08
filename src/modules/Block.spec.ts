import { expect } from 'chai'
import sinon from 'sinon'

import Block from './Block'
import EventBus from './EventBus'

describe('Block', () => {
  let blockInstance: any
  let eventBusSpy: any

  beforeEach(() => {
    eventBusSpy = sinon.spy(EventBus.prototype, 'emit')
    blockInstance = new Block('div', { testProp: 'testValue' })
  })

  afterEach(() => {
    sinon.restore()
  })

  it('инициализация с переданными пропсами', () => {
    expect(blockInstance.props.testProp).to.equal('testValue')
  })

  it('вызов метод "init" при инициализации', () => {
    expect(eventBusSpy.calledWith(Block.EVENTS.INIT)).to.be.true
  })

  it('генерация уникальный ID', () => {
    expect(blockInstance['_id']).to.be.a('string')
  })

  it('создание DOM-элемент в _createResources()', () => {
    blockInstance['init']()
    expect(blockInstance.element).to.be.an.instanceOf(window.HTMLElement)
  })

  it('вызов componentDidMount при вызове dispatchComponentDidMount()', () => {
    const componentDidMountSpy = sinon.spy(blockInstance, 'componentDidMount')
    blockInstance.dispatchComponentDidMount()
    expect(componentDidMountSpy.calledOnce).to.be.true
  })

  it('вызов render при обновлении пропсов', () => {
    const renderSpy = sinon.spy(blockInstance, 'render')
    blockInstance.setProps({ newProp: 'newValue' })
    expect(renderSpy.calledOnce).to.be.true
  })

  it('создание DOM-элемент через _createDocumentElement()', () => {
    const element = blockInstance['_createDocumentElement']('span')
    expect(element.tagName).to.equal('SPAN')
  })

  it('генерация HTML-контент в compile()', () => {
    const template = '<div>{{testProp}}</div>'
    const fragment = blockInstance.compile(template, blockInstance.props)

    expect(fragment.textContent).to.equal('testValue')
  })

  it('регистрация события через _addEvents()', () => {
    const mockElement = document.createElement('div')
    blockInstance['_element'] = mockElement
    blockInstance.props.events = { click: sinon.spy() }

    blockInstance['_addEvents']()
    mockElement.click()

    expect(blockInstance.props.events.click.calledOnce).to.be.true
  })

  it('удаление события через _removeEvents()', () => {
    const mockElement = document.createElement('div')
    const clickSpy = sinon.spy()
    blockInstance['_element'] = mockElement
    blockInstance.props.events = { click: clickSpy }

    blockInstance['_addEvents']()
    blockInstance['_removeEvents']()

    mockElement.click()
    expect(clickSpy.notCalled).to.be.true
  })

  it('скрытие элемента через hide()', () => {
    blockInstance.hide()
    expect(blockInstance.element?.style.display).to.equal('none')
  })

  it('отображение элемента через show()', () => {
    blockInstance.show()
    expect(blockInstance.element?.style.display).to.equal('block')
  })

  //   it('Реакция на вызов dispatchComponentDidMount()', () => {
  //     const spy = sinon.spy(blockInstance, '_componentDidMount')
  //     blockInstance.dispatchComponentDidMount()
  //     expect(spy.calledOnce).to.be.true
  //   })
  //   it('Обгновление пропсов и вызов _componentDidUpdate()', () => {
  //     const componentDidUpdateSpy = sinon.spy(blockInstance, '_componentDidUpdate')
  //     const oldProps = blockInstance.props
  //     blockInstance.setProps({ newProp: 'newValue' })

  //     expect(componentDidUpdateSpy.calledOnce).to.be.true
  //     expect(blockInstance.props.newProp).to.equal('newValue')
  //     expect(oldProps).to.not.equal(blockInstance.props)
  //   })
})
