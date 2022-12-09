import React from 'react';
import PropTypes from 'prop-types';

import Countdown from 'react-countdown'

import Modal from './Modal';
import Share from './Share';

const StatisticsModal = ({ correctAnswer, nextGame, onClose, puzzle, stats, testing }) => {

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

      {puzzle.status === 'PASS' &&
        <Share 
          correctAnswer={correctAnswer} 
          puzzle={puzzle}
        />
      }

      {nextGame &&
        <Countdown
          date={nextGame}
          renderer={({ formatted }) => {
            const { hours, minutes, seconds } = formatted;
            return <div className={'countdown'}>
              <span>Next game</span>
              <time>{hours}:{minutes}:{seconds}</time>
            </div>
          }}
          // // redirect after a 5 seconds (give server a change to clear cache)
          // onComplplete={() => setTimeout(() => location.reload(), 5000)}
        />
      }
    </Modal>
  )
};

StatisticsModal.defaultProps = {
  testing: false,
};

StatisticsModal.propTypes = {
  correctAnswer: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  stats: PropTypes.object.isRequired,
  testing: PropTypes.bool,
};

export default StatisticsModal;
