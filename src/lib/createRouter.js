import { createObserver } from "./createObserver";

export const createRouter = (routes) => {
  const { subscribe, notify } = createObserver();

  const getPath = () => {
    const baseUrl =
      import.meta.env.MODE === "production" ? "/front_5th_chapter1-2" : "";
    return window.location.pathname.replace(baseUrl, "") || "/";
  };

  const getTarget = () => routes[getPath()];

  const push = (path) => {
    if (import.meta.env.MODE === "development") {
      window.history.pushState(null, null, path);
    } else {
      const baseUrl =
        import.meta.env.MODE === "production"
          ? import.meta.env.VITE_BASE_URL
          : "";
      const fullPath = baseUrl + path;

      window.history.pushState(null, null, fullPath);
    }
    notify();
  };

  window.addEventListener("popstate", () => notify());

  return {
    get path() {
      return getPath();
    },
    push,
    subscribe,
    getTarget,
  };
};
