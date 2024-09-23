import { authController } from '../../../controllers/auth-controller'

import Block, { BlockProps } from '../../../modules/Block'
import { withStore } from '../../../modules/Store'

import { template } from './template'

class ProfileBase extends Block {
  constructor(props: any) {
    super('main', props)
    authController.getUser()
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    console.log(oldProps)

    this.children.form.lists.fields.map((i: any) => {
      if (!i.props.value || i.props.value !== newProps.user[i.props.name]) {
        i.setProps({ value: newProps.user[i.props.name] })
      }
    })

    const avatar = document.getElementById('avatar')
    avatar?.setAttribute('src', `https://ya-praktikum.tech/api/v2/resources${newProps.user.avatar}`)

    return true
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withProfile = withStore((state) => {
  return { user: state.user || {} }
})

export const Profile = withProfile(ProfileBase)
