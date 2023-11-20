import React from 'react';
import { createRoot } from 'react-dom/client';

import Puzzle from '../src/js/main';

const puzzle = {
  answer: 'truly',
  message: 'This has been a TRULY transformational year for our university, one marked by remarkable achievement and our first steps together into a bold and bright future.',
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
    debug={env !== 'production'}
    nextGame={
      hurdleData.nextGame ? new Date(parseInt(hurdleData.nextGame)) : null
    }
    onPuzzleComplete={onPuzzleComplete}
  />
);
