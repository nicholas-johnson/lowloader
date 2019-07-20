// import { loadables } from "./cache";
import { LowLoader } from "./low_loader";

describe("LowLoader", () => {
  let lowLoader: LowLoader;
  beforeEach(() => {
    lowLoader = new LowLoader();
  });

  describe("when data is cached", () => {
    it("should return data from the cache", async () => {
      const url = "http://cats.com/miow";
      const data = {};
      expect.assertions(1);
      lowLoader.cache.put(url, Promise.resolve(data));
      lowLoader.import(url).then(returnedData => {
        expect(returnedData).toBe(data);
      });
    });
  });
  describe("when data is not cached", () => {});
});
