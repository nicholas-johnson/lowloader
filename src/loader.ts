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
        this.handleOnError(err as Event, url, reject);
      };

      el.src = url;
      document.head.appendChild(el);
    });
    return promise;
  }

  handleOnLoad(url: string, resolve: (tempArtifact: any) => void) {
    const tempArtifact = window["lowloader"].tempArtifact || {
      message: `url: ${url} was downloaded, but it did not lowloader.export anything. Use a global, or export something. See the README.`
    };
    window["lowloader"].tempArtifact = null;
    resolve(tempArtifact);
  }

  handleOnError(evt: Event, url: string, reject: (message: any) => void) {
    const message = `
      Lowloader: could not load resource  
      url: ${url}`;
    console.warn(message);
    console.warn(evt);
    window["lowloader"].tempArtifact = null;
    reject(message);
  }
}
