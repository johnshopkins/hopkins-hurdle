import { animations as settings } from '../../settings';

/**
 * Calculates a single animation delay
 * @param {int} i            Item position
 * @param {int} delayBetween Delay in ms between each item's animation start
 * @param {int} initialDelay Delay in ms before entire animation start
 * @returns 
 */
const calculateDelay = (i, delayBetween, initialDelay = 0) =>
  ((delayBetween * i) + initialDelay);

/**
 * Calculates the animation delay for a specific animation.
 * Note: jump animation consists of the flip + jumo animation
 * @param {int}    i             Item position
 * @param {string} animation     'flip' or 'jump'
 * @param {string} answer        Currect puzzle answer
 * @param {string} returnAs      string (can be used in CSS directly) or integer
 * 
 * @returns 
 */
const calculateAnimationDelay = (i, animation = 'flip', answer = '', returnAs = 'string') => {

  const delay = [ calculateDelay(i, settings.delayBetweenFlip) ];

  if (animation === 'flip') {
    return returnAs === 'string' ? delay[0] + 'ms' : delay[0];
  }

  // add the length of time it takes flip to finish PLUS a delay between animations to each jump animation
  const add = calculateAnimationDuration('flip', answer) + settings.delayBetweenAnimations;

  delay.push(calculateDelay(i, settings.delayBetweenJump, add));

  return returnAs === 'string' ?
    delay.map(x => `${x}ms`).join(', ') : // append 'ms` and join
    delay.reduce((accumulator, currentValue) => accumulator + currentValue); // add values together
};

/**
 * Calculate the duration of a SINGLE animation.
 * Note: for jump, this does NOT include the flip animaation
 * @param {string} animation 'flip' or 'jump'
 * @param {string} answer    Currect puzzle answer
 * @returns 
 */
const calculateAnimationDuration = (animation = 'flip', answer = '', includeDelayBeteenAnimations = false) => {

  const duration = animation === 'flip' ? settings.flipDuration : settings.jumpDuration;
  const delayBetween = animation === 'flip' ? settings.delayBetweenFlip : settings.delayBetweenJump;
  const delayBetweenAnimations = includeDelayBeteenAnimations ? settings.delayBetweenAnimations : 0;

  return ((answer.length - 1) * delayBetween) + duration + delayBetweenAnimations;
}

export { calculateAnimationDelay, calculateAnimationDuration };
