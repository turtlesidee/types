import { timestamp } from '../number.types';

describe('timestamp type', () => {
  it('should return timestamp when string provided is timestamp compliant', () => {
    expect(timestamp(1234567891)).toBe(1234567891);
  });

  it('should return Error when number provided is not timestamp not compliant', () => {
    try {
      timestamp('NOT TIMESTAMP');
    } catch (e) {
      expect(e).toStrictEqual(Error('do not comply with timestamp format. (i.e 1666255814)'));
    }
  });
});
