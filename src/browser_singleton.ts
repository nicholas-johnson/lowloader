import { LowLoader } from "./low_loader";

window["lowloader"] = window["lowloader"] || {};

const browserSingleton = {
  get: () => {
    if (!window["lowloader"].loader) {
      window["lowloader"].loader = new LowLoader();
    }
    return window["lowloader"].loader;
  }
};

export { browserSingleton };
