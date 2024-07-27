import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')
const index = resolve(__dirname, './src/index.html')
const login = resolve(__dirname, './src/pages/auth/login/login.html')
const chats = resolve(__dirname, './src/pages/chats/chats.html')
const signin = resolve(__dirname, './src/pages/auth/signin/signin.html')
const profile = resolve(__dirname, './src/pages/settings/profile/profile.html')
const password = resolve(__dirname, './src/pages/settings/password/password.html')

export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index,
        signin,
        login,
        chats,
        profile,
        password,
        404: resolve(__dirname, './src/pages/errors/404.html'),
        500: resolve(__dirname, './src/pages/errors/500.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    handlebars({
      context: {
        registration: 'Registration',
        email: 'Email',
        login: 'Login',
        name: 'Name',
        surname: 'Surname',
        phoneNumber: 'Phone number',
        password: 'Password',
        passwordRepeat: 'Password (repeat)',
        signin: 'Sign in',
        signup: 'Sign up',
        haveNoProfile: 'Have no profile?',
        profile: 'Profile',
        chats: 'Chats',
        internalServerError: 'Internal Server Error',
        pageNotFound: 'Page no found',
        backToChats: 'Back to chats',
        back: 'Back',
        refreshThePage: 'Refresh the page',
        nickname: 'Nickname',
        saveChanges: 'Save changes',
        changePassword: 'Change password',
        logout: 'Log out',
        oldPassword: 'Old password',
        newPassword: 'New password',
        repeatNewPassword: 'Repeat new password',
        save: 'Save',
        changeAvatar: 'Change avatar',
      },
    }),
  ],
})
