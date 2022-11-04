import { assert } from 'chai';

import Statistics from '../src/js/lib/helpers/statistics.js';
import localStorageMock from './helpers/localStorageMock.js';
import loggerMock from './helpers/loggerMock.js';

const defaultStats = (num) => {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    winSteak: 0,
    maxStreak: 0,
    guessDistribution: Array.apply(null, Array(num)).map(() => 0),
  }
};

describe('Statistics', () => {

  describe('Constructor', () => {

    it('gets the default stats when local storage is empty', () => {

      const localStorage = new localStorageMock();
      const stats = new Statistics(3, localStorage, loggerMock);

      assert.deepEqual(stats.stats, defaultStats(3));

    });

    it('gets the default stats when local storage is invalid', () => {

      let stats;
      const localStorage = new localStorageMock();

      localStorage.set('hopkinshurdle.stats', { gamesPlayed: false })
      stats = new Statistics(2, localStorage, loggerMock);
      assert.deepEqual(stats.stats, defaultStats(2));

      localStorage.set('hopkinshurdle.stats', { gamesWon: false })
      stats = new Statistics(2, localStorage, loggerMock);
      assert.deepEqual(stats.stats, defaultStats(2));

      localStorage.set('hopkinshurdle.stats', { winStreak: false })
      stats = new Statistics(2, localStorage, loggerMock);
      assert.deepEqual(stats.stats, defaultStats(2));

      localStorage.set('hopkinshurdle.stats', { maxStreak: false })
      stats = new Statistics(2, localStorage, loggerMock);
      assert.deepEqual(stats.stats, defaultStats(2));

      localStorage.set('hopkinshurdle.stats', { guessDistribution: false })
      stats = new Statistics(2, localStorage, loggerMock);
      assert.deepEqual(stats.stats, defaultStats(2));

      localStorage.set('hopkinshurdle.stats', { guessDistribution: [0, 1, 2] })
      stats = new Statistics(2, localStorage, loggerMock);
      assert.deepEqual(stats.stats, defaultStats(2));

    });

  });

  describe('Update', () => {

    it('updates default stats correctly after a win', () => {

      const expected = {
        gamesPlayed: 1,
        gamesWon: 1,
        winSteak: 1,
        maxStreak: 1,
        guessDistribution: [0, 0, 1],
      };

      const localStorage = new localStorageMock();

      const stats = new Statistics(3, localStorage, loggerMock);
      const updated = stats.update('PASS', 3);

      assert.deepEqual(updated, expected);
      assert.deepEqual(localStorage.get('hopkinshurdle.stats'), expected);

    });

    it('updates default stats correctly after a loss', () => {

      const expected = {
        gamesPlayed: 1,
        gamesWon: 0,
        winSteak: 0,
        maxStreak: 0,
        guessDistribution: [0, 0, 0],
      };

      const localStorage = new localStorageMock();

      const stats = new Statistics(3, localStorage, loggerMock);
      const updated = stats.update('FAIL');

      assert.deepEqual(updated, expected);
      assert.deepEqual(localStorage.get('hopkinshurdle.stats'), expected);

    });

    it('updates existing stats correctly after a win', () => {

      const given = {
        gamesPlayed: 20,
        gamesWon: 10,
        winSteak: 2,
        maxStreak: 5,
        guessDistribution: [1, 3, 6],
      };

      const expected = {
        gamesPlayed: 21,
        gamesWon: 11,
        winSteak: 3,
        maxStreak: 5,
        guessDistribution: [1, 3, 7],
      };

      const localStorage = new localStorageMock();
      localStorage.set('hopkinshurdle.stats', given);

      const stats = new Statistics(3, localStorage, loggerMock);
      const updated = stats.update('PASS', 3);

      assert.deepEqual(updated, expected);
      assert.deepEqual(localStorage.get('hopkinshurdle.stats'), expected);

    });

    it('updates existing stats correctly after a loss', () => {

      const given = {
        gamesPlayed: 20,
        gamesWon: 10,
        winSteak: 2,
        maxStreak: 5,
        guessDistribution: [1, 3, 6],
      };

      const expected = {
        gamesPlayed: 21,
        gamesWon: 10,
        winSteak: 0,
        maxStreak: 5,
        guessDistribution: [1, 3, 6],
      };

      const localStorage = new localStorageMock();
      localStorage.set('hopkinshurdle.stats', given);

      const stats = new Statistics(3, localStorage, loggerMock);
      const updated = stats.update('FAIL', 3);

      assert.deepEqual(updated, expected);
      assert.deepEqual(localStorage.get('hopkinshurdle.stats'), expected);

    });

    it('updates max streak', () => {

      const given = {
        gamesPlayed: 20,
        gamesWon: 10,
        winSteak: 5,
        maxStreak: 5,
        guessDistribution: [1, 3, 6],
      };

      const expected = {
        gamesPlayed: 21,
        gamesWon: 11,
        winSteak: 6,
        maxStreak: 6,
        guessDistribution: [1, 3, 7],
      };

      const localStorage = new localStorageMock();
      localStorage.set('hopkinshurdle.stats', given);

      const stats = new Statistics(3, localStorage, loggerMock);
      const updated = stats.update('PASS', 3);

      assert.deepEqual(updated, expected);
      assert.deepEqual(localStorage.get('hopkinshurdle.stats'), expected);

    });

  });

});
