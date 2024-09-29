import { authController } from '../../../controllers/auth-controller'
import Block, { BlockProps } from '../../../modules/Block'
import { withStore } from '../../../modules/Store'

import { template } from './template'

export default class PasswordBase extends Block {
  constructor(props: any) {
    super('main', props)
    authController.getUser()
  }

  protected componentDidUpdate(_oldProps: BlockProps, newProps: BlockProps): boolean {
    this.children.form.lists.fields.map((i: any) => {
      if (!i.props.value || i.props.value !== newProps.password[i.props.name]) {
        i.setProps({ value: newProps.password[i.props.name] })
      }
    })

    const newPassword = document.querySelector('[name="newPassword"]')?.getAttribute('value')
    const repeatNewPassword = document
      .querySelector('[name="repeatNewPassword"]')
      ?.getAttribute('value')

    const saveButton = document.getElementById('save-changes')

    if (newPassword === repeatNewPassword && !!newPassword?.length && !!repeatNewPassword?.length) {
      saveButton?.removeAttribute('disabled')
    } else {
      saveButton?.setAttribute('disabled', '')
    }

    // if (!isEqual(oldProps, newProps)) {
    const avatar = document.getElementById('avatar')
    avatar?.setAttribute('src', `https://ya-praktikum.tech/api/v2/resources${newProps.user.avatar}`)
    return true
    // }

    return false
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withProfile = withStore((state) => {
  return { user: state.user || {}, password: state.password || {} }
})

export const Password = withProfile(PasswordBase)
