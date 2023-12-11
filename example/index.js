// import React from 'react';
// import { createRoot } from 'react-dom/client';
const { createRoot } = ReactDOM;

import { subscribe } from '../src/js/helpers/events';

// subscribe('userInitiatedInfoModal', function () {
//   console.log('event fired', 'userInitiatedInfoModal');
// });

// subscribe('userGuess', function (e) {
//   console.log('user completed a guess');
//   console.log(e.detail);
//   console.log('---');
// });

subscribe('modalOpen', function (e) {
  console.log('modal open');
});

subscribe('modalClose', function (e) {
  console.log('modal close');
});

import { Puzzle } from '../src/js/main';

const puzzle = {
  answer: 'truly',
  message: 'This has been a TRULY transformational year for our university, one marked by remarkable achievement and our first steps together into a bold and bright future.',
  answerDescription: 'The answer has 5 letters.'
};

const onPuzzleComplete = (id, status, guesses) => {
  if (status !== 'PASS') {
    return;
  }

  console.log('puzzle complete');
};

const elem = document.getElementById('puzzle');
const root = createRoot(elem);

root.render(
  <Puzzle
    logger={console}
    id={1}
    puzzle={puzzle}
    debug={true}
    onPuzzleComplete={onPuzzleComplete}
    autoInfoModal={false}
    failMessage={'Solid effort, but it looks like you could use some help. The correct answer is {answer}.'}
    successMessage={'Whoo hoo!'}
    colors={{
      correct: 'blue',
      shuffle: 'gold',
      // incorrect: 'gray'
    }}
  />
);
