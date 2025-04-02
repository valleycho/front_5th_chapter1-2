import { createObserver } from "./createObserver";

export const createRouter = (routes) => {
  const { subscribe, notify } = createObserver();

  const getPath = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    return window.location.pathname.replace(baseUrl, "");
  };

  const getTarget = () => routes[getPath()];

  const push = (path) => {
    window.history.pushState(null, null, `${getPath()}${path}`);
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
