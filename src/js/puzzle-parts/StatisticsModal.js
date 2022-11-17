import React from 'react';

import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import { class as classUtils } from 'js-utils';

import '../../css/StatisticsModal.scss';

const StatisticsModal = ({ onClose, open, stats, testing }) => {

  const attributes = {
    'aria-label': 'Statistics',
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

  // see: https://github.com/focus-trap/focus-trap#testing-in-jsdom
  const focusTrapOptions = testing ? {
    tabbableOptions: {
      displayCheck: 'none'
    }
  } : {};

  return (
    <div {...attributes}>
      <div className={'overlay'}></div>
      {open &&
        <FocusTrap focusTrapOptions={focusTrapOptions}>
          <div className={'stats-container'}>
            <button className={'close-box-x close'} aria-label={'Close modal'} onClick={onClose}>
              <i className={'fa fa-fw fa-times'} aria-hidden={true}></i>
            </button>
            <h2>Statistics</h2>
            <dl className={'overall-stats'}>
              <dt>Games played</dt>
              <dd data-testid={'gamesPlayed'}>{stats.gamesPlayed}</dd>

              <dt>Win percentage</dt>
              <dd data-testid={'winPercentage'}>{winPercentage}%</dd>

              <dt>Current streak</dt>
              <dd data-testid={'winStreak'}>{stats.winStreak}</dd>

              <dt>Max streak</dt>
              <dd data-testid={'maxStreak'}>{stats.maxStreak}</dd>
            </dl>

            <h3>Guess distribution</h3>
            <dl className={'guess-distribution'}>
              {stats.guessDistribution.map((guessCount, guessNumber) => {

                const barWidth = `${unitWidth * guessCount}%`;

                return (
                  <React.Fragment key={guessNumber}>
                    <dt data-testid={`guessDistribution-label-${guessNumber}`}>Games won with {guessNumber + 1} guesses</dt>
                    <dd data-testid={`guessDistribution-count-${guessNumber}`}  style={{width: barWidth}}>{guessCount}</dd>
                  </React.Fragment>
                );
              })}
            </dl>
          </div>
        </FocusTrap>}
    </div>
  )
};

StatisticsModal.defaultProps = {
  testing: false,
};

StatisticsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  stats: PropTypes.object.isRequired,
  testing: PropTypes.bool,
};

export default StatisticsModal;
