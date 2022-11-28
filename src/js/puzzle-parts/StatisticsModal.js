import React from 'react';

import PropTypes from 'prop-types';

import Modal from './Modal';

const StatisticsModal = ({ onClose, stats, testing }) => {

  const winPercentage = (stats.gamesPlayed > 0 && stats.gamesWon > 0) ?
    Math.round((stats.gamesWon / stats.gamesPlayed) * 100) :
    0;

  const maxGuessDistribution = Math.max(...stats.guessDistribution);
  const unitWidth = maxGuessDistribution > 0 ? 100 / maxGuessDistribution : 0;

  return (
    <Modal label={'Statistics'} classes={['stats']} onClose={onClose} testing={testing}>
      <h1>Statistics</h1>
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
    </Modal>
  )
};

StatisticsModal.defaultProps = {
  testing: false,
};

StatisticsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  stats: PropTypes.object.isRequired,
  testing: PropTypes.bool,
};

export default StatisticsModal;
