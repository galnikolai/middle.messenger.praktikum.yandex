import Block from '../../../modules/Block'

import { template } from './template'

export default class ChatUsersList extends Block {
  constructor(props: unknown) {
    super('div', props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
