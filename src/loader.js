import { cache } from './cache';

const load = (url) => {
  const loader = new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.async = false;

    el.onload = (data) => {
      resolve(url);
    };

    el.onerror = (err) => {
      console.warn(`Lowloader: could not load code from url: ${url} - ${err.message}`);
      cache.remove(url);
      reject(url);
    };

    el.src = url;
    document.head.appendChild(el);
  });
  cache.add(url, loader);
  return loader;
};

export const loader = (url) => {
  return cache.check(url) ?
    cache.get(url) :
    load(url);
};
