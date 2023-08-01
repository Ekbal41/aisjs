class Feature {
  constructor(opts = {}) {
    this.freqs = [];
    this.fprefix = "";
    this.addMethods();
  }

  addMethods() {
    const httpMethods = ["GET", "POST", "DELETE", "UPDATE"];
    for (const method of httpMethods) {
      this.factory(method);
    }
  }

  addRoute(method, path, mids, callback) {
    this.freqs.push({
      method,
      path,
      mids,
      callback,
    });
    return this;
  }

  prefix(pfx) {
    this.fprefix = pfx;
    return this;
  }

  factory(method) {
    this[method.toLowerCase()] = (path, ...mids) => {
      const callback = mids.pop();
      this.addRoute(method, path, mids, callback);
      return this;
    };
  }
}

module.exports = (opts) => new Feature(opts);
