import { template } from './template'
import Block from '../../modules/Block'

export default class Popup extends Block {
  constructor(props: unknown) {
    super('div', props)

    const element: HTMLElement | null | undefined = this.element?.querySelector('button')
    const container: HTMLElement | null | undefined =
      this.element?.querySelector('.popup-container')
    const cross: HTMLElement | null | undefined = this.element?.querySelector('.cross')

    if (container && element) {
      element.onclick = () => {
        container?.classList.add('active')
        container?.classList.remove('disabled')
      }
    }

    if (cross && element) {
      cross.onclick = () => {
        container?.classList.add('disabled')
        container?.classList.remove('active')
      }
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
