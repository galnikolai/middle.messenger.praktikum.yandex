import Block from '../../modules/Block'
import { template } from './template'

export default class Chats extends Block {
  constructor(props: any) {
    super('main', props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
