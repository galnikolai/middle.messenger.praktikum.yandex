import "./styles/main.css";
import "./pages/chats/chats.css";
import "./pages/errors/errors.css";
import "./pages/settings/profile/profile.css";
import "./pages/login/login.css";
import "./pages/signin/signin.css";

import { router } from "./router";

document.addEventListener("DOMContentLoaded", () => {
  router();
});
