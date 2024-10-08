import { Routes, router } from './modules/Router'

import Auth from './pages/auth/Auth'
import { Chats } from './pages/chats/Chats'
import { Password } from './pages/settings/password/Password'
// import { profile } from './pages/settings/profile/Profile'
import { login } from './pages/auth/login'
import { signin } from './pages/auth/signin'
import { chats } from './pages/chats'
import { password } from './pages/settings/password'
import { profileObj } from './pages/settings/profile'
import { Profile } from './pages/settings/profile/Profile'
import { notfound } from './pages/errors/404'
import Error from './pages/errors/Error'
import { serverError } from './pages/errors/500'

router
  .use(Routes.LogIn, Auth, login)
  .use(Routes.SignUp, Auth, signin)
  .use(Routes.Settings, Profile, profileObj)
  .use(Routes.Messenger, Chats, chats)
  .use(Routes.SettingsPassword, Password, password)
  .use(Routes.NotFound, Error, notfound)
  .use(Routes.ServerError, Error, serverError)
  .start()
