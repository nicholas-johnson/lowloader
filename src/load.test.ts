import { loadables } from "./loadables";
import loader from "./index";

describe("loading", () => {
  describe("when data is cached", () => {
    const data = Promise.resolve();
    const url = "cats";
    loadables.put(url, data);
    loader.load;
  });
});
