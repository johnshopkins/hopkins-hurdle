import calculateDelay from '../../src/js/helpers/animation-delay-calc';

describe('Calculate animation delay', () => {

  test('calculates the correct delay', () => {

    expect(calculateDelay(0, 100)).toEqual('0ms');
    expect(calculateDelay(5, 100)).toEqual('500ms');

    expect(calculateDelay(0, 100, 0)).toEqual('0ms');
    expect(calculateDelay(0, 100, 500)).toEqual('500ms');
    expect(calculateDelay(5, 100, 500)).toEqual('1000ms');

  });

});
