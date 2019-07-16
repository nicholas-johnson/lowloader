const _cache = {};

export const cache = {
  add(url, data) { 
    _cache[url] = data; 
  },
  get: url => _cache[url];
  check: url => !!this.get(url),
  remove(url) => delete _cache[url],
  clear() { 
    for (const url in _cache) {
      this.remove(url);
    };
  }
}
