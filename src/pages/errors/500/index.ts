import { Link } from '../../../components'
import { Routes } from '../../../modules/Router'

export const serverError = {
  title: '500',
  description: 'Internal Server Error',
  link: new Link({
    text: 'Refresh the page',
    className: 'refresh-link',
    href: Routes.LogIn,
  }),
}
