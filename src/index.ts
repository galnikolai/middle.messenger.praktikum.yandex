import { router } from './modules/Router'
import Auth from './pages/auth/Auth'
import { login } from './pages/auth/login'
import { signin } from './pages/auth/signin'
import { chats } from './pages/chats'
import Chats from './pages/chats/Chats'
import { password } from './pages/settings/password'
import Password from './pages/settings/password/Password'
import { profile } from './pages/settings/profile'
import Profile from './pages/settings/profile/Profile'

router
  .use('/', Auth, login)
  .use('/sign-up', Auth, signin)
  .use('/settings', Profile, profile)
  .use('/messenger', Chats, chats)
  .use('/settings/password', Password, password)
  .start()
