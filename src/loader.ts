export class Loader {
  constructor() {}

  load(url: string) {
    const promise = new Promise((resolve, reject) => {
      const el = document.createElement("script");
      el.async = false;

      el.onload = () => {
        this.handleOnLoad(url, resolve);
      };

      el.onerror = err => {
        this.handleOnError(err, url, reject);
      };

      el.src = url;
      document.head.appendChild(el);
    });
    return promise;
  }

  handleOnLoad(url: string, resolve: (tempArtifact: any) => void) {
    const tempArtifact = window["lowLoader"].tempArtifact || {
      message: `url: ${url} was downloaded, but it did not lowLoader.export anything. Use a global, or export something. See the README.`
    };
    window["lowLoader"].tempArtifact = null;
    resolve(tempArtifact);
  }

  handleOnError(
    err: string | Event,
    url: string,
    reject: (message: any) => void
  ) {
    const message = `
      Lowloader: could not load resource  
      url: ${url} 
      message: ${err.valueOf()}`;
    console.warn(message);
    console.warn(err);
    window["lowLoader"].tempArtifact = null;
    reject(message);
  }
}
