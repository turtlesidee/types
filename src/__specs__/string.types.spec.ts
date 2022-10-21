import { email, sstring, url, uuidV4 } from '../string.types';

describe('url type', () => {
  it('should return url when string provided is url compliant', () => {
    expect(url('https://google.com')).toBe('https://google.com');
  });

  it('should return Error when string provided is not url not compliant', () => {
    try {
      url('NOT URL');
    } catch (e) {
      expect(e).toStrictEqual(Error('do not comply with url format. (i.e https://example.com)'));
    }
  });
});

describe('email type', () => {
  it('should return email when string provided is url compliant', () => {
    expect(email('john.doe@gmail.com')).toBe('john.doe@gmail.com');
  });

  it('should return Error when string provided is not email not compliant', () => {
    try {
      email('NOT EMAIL');
    } catch (e) {
      expect(e).toStrictEqual(Error('do not comply to email format. (i.e john.doe@example.com )'));
    }
  });
});

describe('string type', () => {
  it('should return string when not empty string', () => {
    expect(sstring('hello')).toBe('hello');
  });

  it('should return error when empty string is provided', () => {
    try {
      sstring('');
    } catch (e) {
      expect(e).toStrictEqual(Error('value provided is too short, expected at least 1 characters'));
    }
  });
});

describe('uuidV4 type', () => {
  it('should return uuidv4 when string provided is uuidv4 compliant', () => {
    expect(uuidV4('2a8fe776-cbb6-41bb-afd7-554ebb5b75e9')).toBe('2a8fe776-cbb6-41bb-afd7-554ebb5b75e9');
  });

  it('should return Error when string provided is not uuidv4 compliant', () => {
    try {
      uuidV4('NOT UUID v4');
    } catch (e) {
      expect(e).toStrictEqual(Error('do not comply with uuid format. (i.e 140ce552-1694-4698-8a27-0368fe9e4421)'));
    }
  });
});
