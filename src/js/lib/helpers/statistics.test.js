import Statistics from './statistics';
import localStorageMock from '../mock-objects/localStorageMock';
import loggerMock from '../mock-objects/loggerMock';

const defaultStats = (num) => {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    winStreak: 0,
    maxStreak: 0,
    guessDistribution: Array.apply(null, Array(num)).map(() => 0),
  }
};

describe('Statistics', () => {

  describe('Constructor', () => {

    it('gets the default stats when local storage is empty', () => {

      const localStorage = new localStorageMock();
      const stats = new Statistics(3, localStorage, loggerMock);

      expect(defaultStats(3)).toEqual(stats.stats);

    });

    it('gets the default stats when local storage is invalid', () => {

      let stats;
      const localStorage = new localStorageMock();

      localStorage.set('hopkinshurdle.stats', { gamesPlayed: false })
      stats = new Statistics(2, localStorage, loggerMock);
      expect(defaultStats(2)).toEqual(stats.stats);

      localStorage.set('hopkinshurdle.stats', { gamesWon: false })
      stats = new Statistics(2, localStorage, loggerMock);
      expect(defaultStats(2)).toEqual(stats.stats);

      localStorage.set('hopkinshurdle.stats', { winStreak: false })
      stats = new Statistics(2, localStorage, loggerMock);
      expect(defaultStats(2)).toEqual(stats.stats);

      localStorage.set('hopkinshurdle.stats', { maxStreak: false })
      stats = new Statistics(2, localStorage, loggerMock);
      expect(defaultStats(2)).toEqual(stats.stats);

      localStorage.set('hopkinshurdle.stats', { guessDistribution: false })
      stats = new Statistics(2, localStorage, loggerMock);
      expect(defaultStats(2)).toEqual(stats.stats);

      localStorage.set('hopkinshurdle.stats', { guessDistribution: [0, 1, 2] })
      stats = new Statistics(2, localStorage, loggerMock);
      expect(defaultStats(2)).toEqual(stats.stats);

    });

  });

  describe('Update', () => {

    it('updates default stats correctly after a win', () => {

      const expected = {
        gamesPlayed: 1,
        gamesWon: 1,
        winStreak: 1,
        maxStreak: 1,
        guessDistribution: [0, 0, 1],
      };

      const localStorage = new localStorageMock();

      const stats = new Statistics(3, localStorage, loggerMock);
      const updated = stats.update('PASS', 3);

      expect(updated).toEqual(expected);
      expect(localStorage.get('hopkinshurdle.stats')).toEqual(expected);

    });

    it('updates default stats correctly after a loss', () => {

      const expected = {
        gamesPlayed: 1,
        gamesWon: 0,
        winStreak: 0,
        maxStreak: 0,
        guessDistribution: [0, 0, 0],
      };

      const localStorage = new localStorageMock();

      const stats = new Statistics(3, localStorage, loggerMock);
      const updated = stats.update('FAIL');

      expect(updated).toEqual(expected);
      expect(localStorage.get('hopkinshurdle.stats')).toEqual(expected);

    });

    it('updates existing stats correctly after a win', () => {

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

      const stats = new Statistics(3, localStorage, loggerMock);
      const updated = stats.update('PASS', 3);

      expect(updated).toEqual(expected);
      expect(localStorage.get('hopkinshurdle.stats')).toEqual(expected);

    });

    it('updates existing stats correctly after a loss', () => {

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

      const stats = new Statistics(3, localStorage, loggerMock);
      const updated = stats.update('FAIL', 3);

      expect(updated).toEqual(expected);
      expect(localStorage.get('hopkinshurdle.stats')).toEqual(expected);

    });

    it('updates max streak', () => {

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

      const stats = new Statistics(3, localStorage, loggerMock);
      const updated = stats.update('PASS', 3);

      expect(updated).toEqual(expected);
      expect(localStorage.get('hopkinshurdle.stats')).toEqual(expected);

    });

  });

});
