import { template } from './template'
import Block from '../../modules/Block'

interface AvatarProps {
  src?: string
  className?: string
  id?: string | number
}
export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    super('div', props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
