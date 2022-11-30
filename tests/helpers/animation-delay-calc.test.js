import { calculateAnimationDelay, calculateAnimationDuration } from '../../src/js/helpers/animation-delay-calc';

describe('Calculate animation delay', () => {

  test('calculates the correct delay', () => {

    // animation delay; flip
    expect(calculateAnimationDelay(0)).toEqual('0ms');
    expect(calculateAnimationDelay(4)).toEqual('400ms');

    // animation delay; jump
    expect(calculateAnimationDelay(0, 'jump', 'plant')).toEqual('0ms, 1400ms');
    expect(calculateAnimationDelay(4, 'jump', 'plant')).toEqual('400ms, 1640ms');

    // animation duration
    expect(calculateAnimationDuration('flip', 'plant')).toEqual(900);
    expect(calculateAnimationDuration('jump', 'plant')).toEqual(640);

  });

});
