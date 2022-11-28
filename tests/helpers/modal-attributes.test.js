import getAttributes from '../../src/js/helpers/modal-attributes';

describe('Get Attributes', () => {

  test('gets the default attributes', () => {

    const expected = {
      className: 'modal-container',
      role: 'region',
    };

    expect(getAttributes()).toEqual(expected);

  });

  test('adds label', () => {

    const expected = {
      'aria-label': 'a label',
      className: 'modal-container',
      role: 'region',
    };

    expect(getAttributes('a label')).toEqual(expected);

  });

});
