export default function (status) {
  if (status === 'pass') {
    return 'correct';
  } else if (status === 'shuffle') {
    return 'a correct letter, but in wrong position'
  } else {
    return 'incorrect';
  }
};
