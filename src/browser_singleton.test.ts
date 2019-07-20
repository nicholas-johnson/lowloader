import { browserSingleton } from "./browser_singleton";

describe("BrowserSingleton", () => {
  it("is a singleton", () => {
    expect(browserSingleton.get()).toBe(browserSingleton.get());
  });
});
