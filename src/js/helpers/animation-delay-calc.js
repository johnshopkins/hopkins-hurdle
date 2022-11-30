export default (i, delayBetween, initialDelay = 0) => {

  return ((delayBetween * i) + initialDelay) + 'ms'

};
