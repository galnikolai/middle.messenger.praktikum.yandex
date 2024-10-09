import { userController } from '../../../controllers/user-controller'
import Block from '../../../modules/Block'

import { template } from './template'

export default class UsersList extends Block {
  constructor(props: unknown) {
    super('div', props)
    userController.searchUsers('')
  }

  render() {
    return this.compile(template, this.props)
  }
}
