import { Link } from '../../../components'
import { Routes } from '../../../modules/Router'

export const notfound = {
  title: '404',
  description: 'Page no found',
  link: new Link({
    text: 'Back to chats',
    className: 'refresh-link',
    href: Routes.Messenger,
  }),
}
