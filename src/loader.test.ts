import { Loader } from "./loader";

describe("Loader", () => {
  let loader: Loader;
  let url: string;
  beforeEach(() => {
    loader = new Loader();
    url = "https://cats.dogs.com/hats";
    window["lowloader"] = {};
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
      window["lowloader"].tempArtifact = artifact;
      loader.handleOnLoad(url, resolve);
      expect(resolve).toHaveBeenCalledWith(artifact);
      expect(window["lowloader"].tempArtifact).toBeNull();
    });

    it("handles onError", () => {
      const reject = jest.fn();
      const artifact = "cats";
      const evt = {} as Event;
      window["lowloader"].tempArtifact = artifact;
      loader.handleOnError(evt, url, reject);
      expect(reject).toHaveBeenCalled();
      expect(window["lowloader"].tempArtifact).toBeNull();
    });
  });
});
