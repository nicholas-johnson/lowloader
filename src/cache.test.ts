import { cache } from "../src-old/cache";

describe("cache", () => {
  let url;
  let data;
  beforeEach(() => {
    url = "unsurprising-software.com";
    data = {};
    cache.clear();
  });

  it("can cache.put", () => {
    expect(cache.check(url)).toBe(false);
    cache.put(url, data);
    expect(cache.check(url)).toBe(true);
  });

  it("can cache.get", () => {
    expect(cache.check(url)).toBe(false);
    cache.put(url, data);
    expect(cache.get(url)).toBe(data);
  });

  it("can cache.remove", () => {
    cache.put(url, data);
    expect(cache.check(url)).toBe(true);
    cache.remove(url);
    expect(cache.check(url)).toBe(false);
  });

  it("can cache.check", () => {
    expect(cache.check(url)).toBe(false);
    cache.put(url, data);
    expect(cache.check(url)).toBe(true);
  });

  it("can cache.clear", () => {
    cache.put(url, data);
    expect(cache.check(url)).toBe(true);
    cache.clear();
    expect(cache.check(url)).toBe(false);
  });
});
