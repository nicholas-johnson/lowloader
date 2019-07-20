import { Loader } from "./loader";

describe("Loader", () => {
  let loader: Loader;
  let url: string;
  beforeEach(() => {
    loader = new Loader();
    url = "https://cats.dogs.com/hats";
    window["lowLoader"] = {};
  });

  describe("load", () => {
    it("appends a DOM node", () => {
      loader.load(url);
      const script = document.querySelector(`script[src='${url}']`);
      expect(script).toBeDefined();
    });

    it("handles onLoad", () => {
      const resolve = jest.fn();
      const artifact = "cats";
      window["lowLoader"].tempArtifact = artifact;
      loader.handleOnLoad(url, resolve);
      expect(resolve).toHaveBeenCalledWith(artifact);
      expect(window["lowLoader"].tempArtifact).toBeNull();
    });

    it("handles onError", () => {
      const reject = jest.fn();
      const artifact = "cats";
      const err = "Oh crabsticks.";
      window["lowLoader"].tempArtifact = artifact;
      loader.handleOnError(url, err, reject);
      expect(reject).toHaveBeenCalled();
      expect(window["lowLoader"].tempArtifact).toBeNull();
    });
  });
});
