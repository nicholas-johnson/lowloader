// Caching

const _cache: any = {};

export const cache = {
  /**
   * adds a promise to the cache under a URL
   * @param url
   * @param data
   */
  put(url: string, data: Promise<any>) {
    _cache[url] = data;
  },

  /**
   * gets a promise from the cache
   * @param url
   */
  get: (url: string) => _cache[url] as Promise<any>,

  /**
   * removes a promise from the cache
   * @param url
   */
  remove(url: string) {
    delete _cache[url];
  },

  /**
   * Test to see if a promise is in the cache
   * @param url
   */
  check: (url: string) => !!cache.get(url),

  /** Clears the whole cache */
  clear() {
    for (const url in _cache) cache.remove(url);
  }
};
