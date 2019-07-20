import { browserSingleton } from "./browser_singleton";

window["lowloader"] = window["lowloader"] || {};

const lowLoader = browserSingleton.get();

export default lowLoader;
