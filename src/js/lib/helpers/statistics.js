export default class Statistics {

  constructor(availableGuesses, localStorage, logger) {
    this.availableGuesses = availableGuesses;
    this.localStorage = localStorage;
    this.logger = logger;

    this.localStorageKey = 'hopkinshurdle.stats';

    this.stats = this.validateStoredStats(this.localStorage.get(this.localStorageKey));
  }

  getDefaultStats(availableGuesses) {
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      winStreak: 0,
      maxStreak: 0,
      guessDistribution: Array.apply(null, Array(availableGuesses)).map(() => 0),
    };
  }

  validateStoredStats(storedStats) {

    if (storedStats === null) {
      // no user stats found in local storage; return default stats
      return this.getDefaultStats(this.availableGuesses);
    }

    try {

      ['gamesPlayed', 'gamesWon', 'winStreak', 'maxStreak'].map(key => {
        if (!Number.isInteger(storedStats.gamesPlayed)) {
          throw new Error('Invalid stat: ' + key);
        }
      });

      if (!Array.isArray(storedStats.guessDistribution) || storedStats.guessDistribution.length !== this.availableGuesses) {
        throw new Error('Invalid stat: guessDistribution');
      }

    } catch (e) {
      this.logger.log('Invalid stats from localStorage', {
        level: 'warning',
        data: {
          message: e.message,
          storedStats: storedStats
        }
      });

      return this.getDefaultStats(this.availableGuesses);
    }

    return storedStats;
  }

  update(status, numberOfGuesses) {

    this.stats.gamesPlayed++;

    if (status === 'PASS') {
      this.stats.gamesWon++;
      this.stats.winStreak++;
      this.stats.guessDistribution[numberOfGuesses - 1]++;
    } else {
      this.stats.winStreak = 0;
    }

    if (this.stats.maxStreak < this.stats.winStreak) {
      this.stats.maxStreak = this.stats.winStreak;
    }

    this.localStorage.set(this.localStorageKey, this.stats)

    return this.stats;
  }
}
