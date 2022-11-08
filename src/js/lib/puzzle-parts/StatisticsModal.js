import React from 'react';

import FocusTrap from 'focus-trap-react';
import { class as classUtils } from 'js-utils';

export default ({ onClose, open, stats }) => {

  const attributes = {
    className: 'stats',
    role: 'region'
  };

  if (open) {
    attributes.className+= ' open';
    classUtils.addClass(document.body, 'modal-open');
  } else {
    classUtils.removeClass(document.body, 'modal-open');
  }

  const winPercentage = (stats.gamesPlayed > 0 && stats.gamesWon > 0) ?
    Math.round((stats.gamesWon / stats.gamesPlayed) * 100) :
    0;

  const maxGuessDistribution = Math.max(...stats.guessDistribution);
  const unitWidth = maxGuessDistribution > 0 ? 100 / maxGuessDistribution : 0;

  return (
    <div {...attributes}>
      <div className={'overlay'}></div>
      {open &&
        <FocusTrap>
          <div className={'stats-container'}>
            <button className={'close'} onClick={onClose}>
              <img src={'../../../build/images/close.svg'} alt={'Close modal'} />
            </button>
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
                    <dt>Games won with {guessNumber + 1} guesses</dt>
                    <dd style={{width: barWidth}}>{guessCount}</dd>
                  </React.Fragment>
                );
              })}
            </dl>
          </div>
        </FocusTrap>}
    </div>
  )
}
