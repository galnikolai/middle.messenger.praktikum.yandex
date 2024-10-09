import { authController } from '../../controllers/auth-controller'
import Block from '../../modules/Block'

import { template } from './template'

export default class AuthBase extends Block {
  constructor(props: unknown) {
    super('div', props)
    authController.getUser()
  }

  render() {
    return this.compile(template, this.props)
  }
}
