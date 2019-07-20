window["lowloader"] = window["lowloader"] || {};

export const import = (name: string, data: any) => {
  loadables.put(name, data);
  // window["lowloader"].loadables[objectName] = data;
};
