import Block from '../../modules/Block'
import { template } from './template'

export default class Auth extends Block {
  constructor(props: any) {
    super('div', props)
  }

  render() {
    console.log('here')

    // if () {

    // }
    return this.compile(template, this.props)
  }
}
