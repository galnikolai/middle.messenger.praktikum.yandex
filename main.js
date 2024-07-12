import "./style.css";
import "./src/pages/chats/chats.css";
import "./src/pages/errors/errors.css";
import "./src/pages/settings/profile/profile.css";
import "./src/pages/settings/password/password.css";
import "./src/pages/login/login.css";
import "./src/pages/signin/signin.css";

import { router } from "./src/router";

document.addEventListener("DOMContentLoaded", () => {
  router();
});
