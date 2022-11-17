import Statistics from '../../src/js/helpers/statistics';
import localStorageMock from '../mock-objects/localStorageMock';
import loggerMock from '../mock-objects/loggerMock';

const defaultStats = (num, overrides) => {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    winStreak: 0,
    maxStreak: 0,
    guessDistribution: Array.apply(null, Array(num)).map(() => 0),
    ...overrides
  }
};

describe('Statistics', () => {

  describe('Constructor', () => {

    test('gets the default stats when local storage is empty', () => {

      const localStorage = new localStorageMock();
      const stats = new Statistics(3, localStorage, new loggerMock());

      expect(defaultStats(3)).toEqual(stats.stats);

    });

    ['gamesPlayed', 'gamesWon', 'winStreak', 'maxStreak'].map(key => {
      test(`gets the default stats when stored integer stat, ${key}, is invalid`, () => {

        const logger = new loggerMock();

        const localStorage = new localStorageMock();
        const stored = {};
        stored[key] = false;
        localStorage.set('hopkinshurdle.stats', defaultStats(2, stored));

        const stats = new Statistics(2, localStorage, logger);

        expect(defaultStats(2)).toEqual(stats.stats);
        expect(logger.logged[0].data.data.message).toBe(`Invalid stat: ${key}`);

      });
    });

    test(`gets the default stats when stored array stat, guessDistribution, is not an array`, () => {

      const logger = new loggerMock();

      const localStorage = new localStorageMock();
      localStorage.set('hopkinshurdle.stats', defaultStats(2, { guessDistribution: false }));

      const stats = new Statistics(2, localStorage, logger);

      expect(defaultStats(2)).toEqual(stats.stats);
      expect(logger.logged[0].data.data.message).toBe('Invalid stat: guessDistribution');

    });

    test(`gets the default stats when stored array stat, guessDistribution, has an invalid number of values`, () => {

      const logger = new loggerMock();

      const localStorage = new localStorageMock();
      localStorage.set('hopkinshurdle.stats', defaultStats(2, { guessDistribution: [0, 1, 2] }));

      const stats = new Statistics(2, localStorage, logger);

      expect(defaultStats(2)).toEqual(stats.stats);
      expect(logger.logged[0].data.data.message).toBe('Invalid stat: guessDistribution');

    });

  });

  describe('Update', () => {

    test('updates default stats correctly after a win', () => {

      const expected = {
        gamesPlayed: 1,
        gamesWon: 1,
        winStreak: 1,
        maxStreak: 1,
        guessDistribution: [0, 0, 1],
      };

      const localStorage = new localStorageMock();

      const stats = new Statistics(3, localStorage, new loggerMock());
      const updated = stats.update('PASS', 3);

      expect(updated).toEqual(expected);
      expect(localStorage.get('hopkinshurdle.stats')).toEqual(expected);

    });

    test('updates default stats correctly after a loss', () => {

      const expected = {
        gamesPlayed: 1,
        gamesWon: 0,
        winStreak: 0,
        maxStreak: 0,
        guessDistribution: [0, 0, 0],
      };

      const localStorage = new localStorageMock();

      const stats = new Statistics(3, localStorage, new loggerMock());
      const updated = stats.update('FAIL');

      expect(updated).toEqual(expected);
      expect(localStorage.get('hopkinshurdle.stats')).toEqual(expected);

    });

    test('updates existing stats correctly after a win', () => {

      const given = {
        gamesPlayed: 20,
        gamesWon: 10,
        winStreak: 2,
        maxStreak: 5,
        guessDistribution: [1, 3, 6],
      };

      const expected = {
        gamesPlayed: 21,
        gamesWon: 11,
        winStreak: 3,
        maxStreak: 5,
        guessDistribution: [1, 3, 7],
      };

      const localStorage = new localStorageMock();
      localStorage.set('hopkinshurdle.stats', given);

      const stats = new Statistics(3, localStorage, new loggerMock());
      const updated = stats.update('PASS', 3);

      expect(updated).toEqual(expected);
      expect(localStorage.get('hopkinshurdle.stats')).toEqual(expected);

    });

    test('updates existing stats correctly after a loss', () => {

      const given = {
        gamesPlayed: 20,
        gamesWon: 10,
        winStreak: 2,
        maxStreak: 5,
        guessDistribution: [1, 3, 6],
      };

      const expected = {
        gamesPlayed: 21,
        gamesWon: 10,
        winStreak: 0,
        maxStreak: 5,
        guessDistribution: [1, 3, 6],
      };

      const localStorage = new localStorageMock();
      localStorage.set('hopkinshurdle.stats', given);

      const stats = new Statistics(3, localStorage, new loggerMock());
      const updated = stats.update('FAIL', 3);

      expect(updated).toEqual(expected);
      expect(localStorage.get('hopkinshurdle.stats')).toEqual(expected);

    });

    test('updates max streak', () => {

      const given = {
        gamesPlayed: 20,
        gamesWon: 10,
        winStreak: 5,
        maxStreak: 5,
        guessDistribution: [1, 3, 6],
      };

      const expected = {
        gamesPlayed: 21,
        gamesWon: 11,
        winStreak: 6,
        maxStreak: 6,
        guessDistribution: [1, 3, 7],
      };

      const localStorage = new localStorageMock();
      localStorage.set('hopkinshurdle.stats', given);

      const stats = new Statistics(3, localStorage, new loggerMock());
      const updated = stats.update('PASS', 3);

      expect(updated).toEqual(expected);
      expect(localStorage.get('hopkinshurdle.stats')).toEqual(expected);

    });

  });

});
