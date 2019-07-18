import { loadables } from "./loadables";

const loader = (url: string, name: string = undefined) => {
  const promise = new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.async = false;

    el.onload = data => {
      name ? resolve(loadables.get(name)) : resolve(url);
    };

    el.onerror = err => {
      console.warn(`Lowloader: could not load code from url: ${url} - ${err}`);
      loadables.remove(url);
      reject(url);
    };

    el.src = url;
    document.head.appendChild(el);
  });
  loadables.put(url, promise);
  return promise;
};

export const load = url => {
  return loadables.check(url) ? loadables.get(url) : load(url);
};
