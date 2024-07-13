import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  root: "src",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: "index.html",
        signin: "src/pages/signin/signin.html",
        login: "src/pages/login/login.html",
        404: "src/pages/errors/404.html",
        500: "src/pages/errors/500.html",
        profile: "src/pages/settings/profile/profile.html",
        password: "/src/pages/settings/password/password.html",
        chats: "src/pages/chats/chats.html",
      },
    },
  },
  server: {
    port: 4000,
  },
  preview: {
    port: 3000,
  },
  plugins: [
    handlebars({
      context: {
        registration: "Registration",
        email: "Email",
        login: "Login",
        name: "Name",
        surname: "Surname",
        phoneNumber: "Phone number",
        password: "Password",
        passwordRepeat: "Password (repeat)",
        signin: "Sign in",
        signup: "Sign up",
        haveNoProfile: "Have no profile?",
        profile: "Profile",
        internalServerError: "Internal Server Error",
        pageNotFound: "Page no found",
        backToChats: "Back to chats",
        back: "Back",
        refreshThePage: "Refresh the page",
        nickname: "Nickname",
        saveChanges: "Save changes",
        changePassword: "Change password",
        logout: "Log out",
        oldPassword: "Old password",
        newPassword: "New password",
        repeatNewPassword: "Repeat new password",
        save: "Save",
        changeAvatar: "Change avatar",
      },
    }),
  ],
});
