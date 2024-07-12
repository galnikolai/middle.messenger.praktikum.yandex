export function router() {
  const routes = {
    "/": "/src/pages/home.html",
    "/login": "/src/pages/login/login.html",
    "/signin": "/src/pages/signin/signin.html",
    "/settings/profile": "/src/pages/settings/profile/profile.html",
    "/settings/password": "/src/pages/settings/password/password.html",
    "/chats": "/src/pages/chats/chats.html",
    "/500": "/src/pages/errors/500.html",
    "/404": "/src/pages/errors/404.html",
  };

  const rootDiv = document.getElementById("app");

  const loadContent = async (path) => {
    const response = await fetch(path);
    const content = await response.text();
    rootDiv.innerHTML = content;
    attachNavLinks();
  };

  const attachNavLinks = () => {
    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const path = event.target.getAttribute("href");
        history.pushState({}, "", path);
        loadContent(routes[path]);
      });
    });
  };

  window.addEventListener("popstate", () => {
    loadContent(routes[window.location.pathname]);
  });

  loadContent(routes[window.location.pathname]);
}
