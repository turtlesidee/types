import { createPrimitive, NumberBase, StringBase } from '../base';
import { timestamp } from '../number.types';
import { url } from '../string.types';

describe('string base', () => {
  describe('min configuration', () => {
    type Min3Char = string & { _tag: 'Min3Char' };
    const Min3Char = StringBase<Min3Char>({ min: 3 });
    const min3Char = createPrimitive<Min3Char>(Min3Char);

    it('should return string when string does reach minimum characters', () => {
      expect(min3Char('abc')).toBe('abc');
    });

    it('should return Error when string does not reach minimum characters', () => {
      try {
        min3Char('ab');
      } catch (e) {
        expect(e).toStrictEqual(Error('value provided is too short, expected at least 3 characters'));
      }
    });
  });

  describe('max configuration', () => {
    type Max3Char = string & { _tag: 'Max3Char' };
    const Max3Char = StringBase<Max3Char>({ max: 10 });
    const max3Char = createPrimitive<Max3Char>(Max3Char);

    it('should return string when string does not reach maximum characters', () => {
      expect(max3Char('BELOW_10')).toBe('BELOW_10');
    });

    it('should return Error when string is above threshold', () => {
      try {
        max3Char('ABOVE_10_CHARACTERS');
      } catch (e) {
        expect(e).toStrictEqual(Error('value provided is too long, expected at most 10 characters'));
      }
    });
  });

  describe('pattern configuration', () => {
    it('should return string when pattern is verified', () => {
      expect(url('https://google.com')).toBe('https://google.com');
    });

    it('should return Error when pattern is not verified', () => {
      try {
        url('NOT AN URL');
      } catch (e) {
        expect(e).toStrictEqual(Error('do not comply with url format. (i.e https://example.com)'));
      }
    });
  });

  describe('format configuration', () => {
    type Lastname = string & { _tag: 'Lastname' };
    const Lastname = StringBase<Lastname>({ max: 32, format: (str: string) => str.toUpperCase() });
    const lastname = createPrimitive<Lastname>(Lastname);

    it('should return format string', () => {
      expect(lastname('leroy')).toBe('LEROY');
    });
  });
});

describe('number base', () => {
  describe('min configuration', () => {
    type AtLeast10 = number & { _tag: 'AtLeast10' };
    const AtLeast10 = NumberBase<AtLeast10>({ min: 10 });
    const atLeast10 = createPrimitive<AtLeast10>(AtLeast10);
    it('should return number when number does reach minimum characters', () => {
      expect(atLeast10(20)).toBe(20);
    });

    it('should return Error when string does not reach minimum characters', () => {
      try {
        atLeast10(9);
      } catch (e) {
        expect(e).toStrictEqual(Error('value provided is too short, expected at least 10'));
      }
    });
  });

  describe('max configuration', () => {
    type AtMax10 = number & { _tag: 'AtLeast10' };
    const AtMax10 = NumberBase<AtMax10>({ max: 10 });
    const atMax10 = createPrimitive<AtMax10>(AtMax10);
    it('should return number when number does not reach maximum characters', () => {
      expect(atMax10(9)).toBe(9);
    });

    it('should return Error when number is above threshold', () => {
      try {
        atMax10(11);
      } catch (e) {
        expect(e).toStrictEqual(Error('value provided is too long, expected at most 10'));
      }
    });
  });

  describe('pattern configuration', () => {
    it('should return number when pattern is verified', () => {
      expect(timestamp(1666255814184)).toBe(1666255814);
    });

    it('should return Error when pattern is not verified', () => {
      try {
        timestamp('NOT_TIMESTAMP');
      } catch (e) {
        expect(e).toStrictEqual(Error('do not comply with timestamp format. (i.e 1666255814)'));
      }
    });
  });

  describe('format configuration', () => {
    it('should return format number', () => {
      expect(timestamp(1666255814184)).toBe(1666255814);
    });
  });
});
