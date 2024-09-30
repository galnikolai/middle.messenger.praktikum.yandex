import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, './src/index.html'),
      output: {
        format: 'es',
        strict: false,
        dir: 'dist/',
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
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
