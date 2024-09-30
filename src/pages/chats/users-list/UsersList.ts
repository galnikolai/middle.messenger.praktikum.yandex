import { userController } from '../../../controllers/user-controller'
import Block from '../../../modules/Block'

import { template } from './template'

export default class UsersList extends Block {
  constructor(props: any) {
    super('div', props)
    userController.searchUsers('')
  }

  render() {
    return this.compile(template, this.props)
  }
}
