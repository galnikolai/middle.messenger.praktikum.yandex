import { Link } from '../../../components'
import { render } from '../../../utils/renderDOM'
import Error from '../Error'

const notfound = new Error({
  title: '404',
  description: 'Page no found',
  link: new Link({
    text: 'Back to chats',
    className: 'refresh-link',
    href: '/pages/chats/chats',
  }),
})

render('.app', notfound)
