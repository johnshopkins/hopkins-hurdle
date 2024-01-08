const store = {
  'hopkinshurdle.seenInfo': null,
};

const get = (key) => {
  return store[key];
};

const set = (key, value) => {
  return store[key] = value
};

const local = {
  store,
  get,
  set,
}

export { local };
