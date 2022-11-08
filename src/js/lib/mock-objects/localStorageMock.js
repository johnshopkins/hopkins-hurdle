export default class LocalStorageMock {

  constructor() {
    this.store = {};
  }

  get(key) {
    return this.store[key] || null;
  }

  set(key, data) {
    this.store[key] = data;
  }
}
