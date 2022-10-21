import { cardinal, CARDINAL } from '../enumeration.types';

describe('Cardinal type', () => {
  it('should return cardinal type when value provided is one of Cardinal', () => {
    expect(cardinal(CARDINAL.WEST)).toBe(CARDINAL.WEST);
  });

  it('should return Error when value provided is not one of Cardinal', () => {
    try {
      cardinal('NOT CARDINAL');
    } catch (e) {
      expect(e).toStrictEqual(Error('value unexpected, must be one of NORTH, SOUTH, WEST, EST'));
    }
  });
});
