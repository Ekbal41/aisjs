class Router {
  constructor() {
    this.routerHttpRequests = [];
  }

  addRoute(method, path, mids, callback) {
    this.routerHttpRequests.push({
      method,
      path,
      mids,
      callback,
    });
  }
  get(path, ...mids) {
    const callback = mids.pop();
    this.addRoute("GET", path, mids, callback);
  }
  post(path, ...mids) {
    const callback = mids.pop();
    this.addRoute("POST", path, mids, callback);
  }
  delete(path, ...mids) {
    const callback = mids.pop();
    this.addRoute("DELETE", path, mids, callback);
  }
  update(path, ...mids) {
    const callback = mids.pop();
    this.addRoute("UPDATE", path, mids, callback);
  }
}

module.exports = Router;
