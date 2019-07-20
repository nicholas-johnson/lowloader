window["lowloader"] = window["lowloader"] || {};

export class Cache {
  store: any = {};

  /**
   * adds a promise to the cache under a URL
   * @param key
   * @param data
   */
  put(key: string, data: Promise<any>) {
    this.store[key] = data;
  }

  /**
   * gets a promise from the cache
   * @param key
   */
  get = (key: string) => this.store[key] as Promise<any>;

  /**
   * removes a promise from the cache
   * @param key
   */
  remove(key: string) {
    delete this.store[key];
  }

  /**
   * Test to see if a promise is in the cache
   * @param key
   */
  check = (key: string) => !!this.get(key);

  /** Clears the whole cache */
  clear() {
    for (const key in this.store) this.remove(key);
  }
}
