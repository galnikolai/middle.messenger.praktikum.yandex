import { Link } from '../../../components'
import { render } from '../../../utils/renderDOM'
import Error from '../Error'

const notfound = new Error({
  title: '500',
  description: 'Internal Server Error',
  link: new Link({
    text: 'Refresh the page',
    className: 'refresh-link',
    href: '/',
  }),
})

render('.app', notfound)
