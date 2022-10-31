import { local as localStorage } from './storage';

const localStorageKey = id => `hopkinshurdle.${id}`;

const savePuzzleState = (id, puzzle) => {
  try {
    return localStorage.set(localStorageKey(id), puzzle);
  } catch (e) {
    return false;
  }
};

const loadPuzzleState = id => {
  return localStorage.get(localStorageKey(id))
};

export { savePuzzleState, loadPuzzleState };
