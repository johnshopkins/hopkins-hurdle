import React from 'react';

// import { AccessibleModal } from 'accessible-modal';

export default ({ stats }) => {

  const attributes = {
    // 'aria-label': 'Clue',
    // 'aria-live': 'polite',
    className: 'stats',
    role: 'region'
  };

  const winPercentage = (stats.gamesPlayed > 0 && stats.gamesWon > 0) ?
    Math.round((stats.gamesWon / stats.gamesPlayed) * 100) :
    0;

  const maxGuessDistribution = Math.max(...stats.guessDistribution);
  const unitWidth = maxGuessDistribution > 0 ? 100 / maxGuessDistribution : 0;

  return (
    <div {...attributes}>
      <h2>Statistics</h2>
      <dl className={'overall-stats'}>
        <dt>Games played</dt>
        <dd>{stats.gamesPlayed}</dd>

        <dt>Win percentage</dt>
        <dd>{winPercentage}%</dd>

        <dt>Current streak</dt>
        <dd>{stats.winStreak}</dd>

        <dt>Max streak</dt>
        <dd>{stats.maxStreak}</dd>
      </dl>

      <h3>Guess distribution</h3>
      <dl className={'guess-distribution'}>
        {stats.guessDistribution.map((guessCount, guessNumber) => {

          const barWidth = `${unitWidth * guessCount}%`;

          return (
            <React.Fragment key={guessNumber}>
              <dt>Games won with {guessNumber} guesses</dt>
              <dd style={{width: barWidth}}>{guessCount}</dd>
            </React.Fragment>
          );
        })}
      </dl>
    </div>
  );
}
