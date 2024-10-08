import { template } from './template'
import Block from '../../modules/Block'

export default class Link extends Block {
  constructor(props: any) {
    super('div', props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
