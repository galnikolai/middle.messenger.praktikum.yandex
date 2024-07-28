import EventBus from './EventBus'
import { v4 as makeUUID } from 'uuid'
import Handlebars from 'handlebars'

interface Meta {
  tagName: string
  props: any
}

interface BlockProps {
  [key: string]: any
}

class Block {
  private _meta: Meta
  private _id: string | null = null
  private _eventBus: EventBus
  private _element: HTMLElement | null = null
  protected props: BlockProps
  protected children: {
    [key: string]: {
      _id: string
      [key: string]: any
    }
  }
  protected lists: {
    [key: string]: {
      _id: string
      [key: string]: any
    }
  }

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
  }

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */

  constructor(tagName: string = 'div', propsAndChildren: BlockProps = {}) {
    const eventBus = new EventBus()

    const { children, props, lists } = this._getChildren(propsAndChildren)
    this.children = children
    this.lists = lists

    this._meta = {
      tagName,
      props,
    }

    this._id = makeUUID()

    if (props.withInternalID) {
      this.props = this._makePropsProxy({ ...props, __id: this._id })
    } else {
      this.props = this._makePropsProxy(props)
    }

    this._eventBus = eventBus

    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _createResources() {
    const { tagName } = this._meta
    this._element = this._createDocumentElement(tagName)
  }

  protected init() {
    this._createResources()
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER)
  }

  private _componentDidMount(): void {
    this.componentDidMount()
  }

  protected componentDidMount() {} // oldProps?: BlockProps

  protected dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM)
  }

  // private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
  //   return true
  // }

  compile(
    template: string,
    props: {
      [key: string]: string
    }
  ) {
    const propsAndStubs: { [key: string]: string } = { ...props }

    Object.entries(this.children).forEach(
      ([key, child]: [
        key: string,
        child: {
          [key: string]: {
            _id: string
            [key: string]: any
          }
        }
      ]) => {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`
      }
    )

    Object.entries(this.lists).forEach(
      ([key]: [
        key: string,
        child: {
          [key: string]: {
            _id: string
            [key: string]: any
          }
        }
      ]) => {
        propsAndStubs[key] = `<div data-id="${key}"></div>`
      }
    )

    const fragment: any = this._createDocumentElement('template')
    const compiledTemplate = Handlebars.compile(template, propsAndStubs)

    fragment.innerHTML = compiledTemplate(propsAndStubs)

    Object.values(this.children).forEach((child: any) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)
      stub.replaceWith(child.getContent())
    })

    Object.entries(this.lists).forEach(([key, child]) => {
      const stub = fragment.content.querySelector(`[data-id="${key}"]`)

      if (!stub) return
      const listFragment: any = this._createDocumentElement('template')

      child.forEach((element: any) => {
        if (element instanceof Block) {
          listFragment.content.append(element.getContent())
        } else {
          listFragment.content.append(`${element}`)
        }
      })

      stub.replaceWith(listFragment.content)
    })
    return fragment.content
  }

  private _addEvents() {
    const { events = {} } = this.props

    Object.keys(events).forEach((eventName) => {
      if (eventName === 'blur') {
        this._element
          ?.getElementsByTagName('input')[0]
          .addEventListener(eventName, events[eventName])
      }
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName])
      }
    })
  }

  private _removeEvents() {
    const { events = {} } = this.props

    Object.keys(events).forEach((eventName) => {
      if (eventName === 'blur' && this._element) {
        this._element.removeEventListener(eventName, events[eventName])
      }

      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName])
      }
    })
  }

  // componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
  //   return true
  // }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  get element(): HTMLElement | null {
    return this._element
  }

  private _render(): void {
    const block: any = this.render()

    this._removeEvents()
    if (this._element) {
      this._element.innerHTML = ''

      this._element.appendChild(block)
    }

    this._addEvents()
  }

  render(): string {
    return this.compile('', this.props)
  }

  getContent(): HTMLElement | null {
    return this.element
  }

  private _getChildren(propsAndChildren: any) {
    const children: any = {}
    const props: any = {}
    const lists: any = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        lists[key] = value
      } else if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { children, props, lists }
  }

  private _makePropsProxy(props: BlockProps): BlockProps {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof BlockProps]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop, value) {
        target[prop as keyof BlockProps] = value
        return true
      },
    })
  }

  private _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName)
    if (this.props.withInternalID && this._id) {
      element.setAttribute('data-id', this._id)
    }
    return element
  }

  show() {
    const content = this.getContent()
    if (content) {
      content.style.display = 'block'
    }
  }

  hide() {
    const content = this.getContent()
    if (content) {
      content.style.display = 'none'
    }
  }
}

export default Block
