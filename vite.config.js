import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
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
