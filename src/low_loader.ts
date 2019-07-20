import { Cache } from "./cache";
import { Loader } from "./loader";

window["lowloader"] = window["lowloader"] || {};

export class LowLoader {
  cache: Cache;

  constructor() {
    this.cache = new Cache();
  }

  import(url: string) {
    if (this.cache.check(url)) {
      return this.cache.get(url);
    }
    const loader = new Loader();
    const promise = loader.load(url);
    this.cache.put(url, promise);
    return promise;
  }

  export(data) {
    window["lowloader"].tempArtifact = data;
  }
}
