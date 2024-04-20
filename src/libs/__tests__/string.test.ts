import {
  formatPhoneNumber,
  formatTextToNumber,
  removeAreaCodeFromPhoneNumber,
  unformatPhoneNumberAndAddAreaCode,
  uniqueString,
} from '@/libs/string';

describe('generating unique strings', () => {
  test('should return a string', () => {
    const result = uniqueString();
    expect(typeof result).toBe('string');
  });

  test('should return a string with a length greater than 0', () => {
    const result = uniqueString();
    expect(result.length).toBeGreaterThan(0);
  });

  test('should return unique strings on multiple calls', () => {
    const result1 = uniqueString();
    const result2 = uniqueString();
    expect(result1).not.toBe(result2);
  });
});

describe('formatting texts to numbers', () => {
  it('should remove non-numeric characters from the input string', () => {
    const result = formatTextToNumber('abc123def456');
    expect(result).toBe('123456');
  });

  it('should handle an empty string', () => {
    const result = formatTextToNumber('');
    expect(result).toBe('');
  });

  it('should handle a string with no numeric characters', () => {
    const result = formatTextToNumber('abc');
    expect(result).toBe('');
  });

  it('should handle a string with special characters', () => {
    const result = formatTextToNumber('|!^+%&()=?_!|}][{§½$#£>@#123$%^&*()456');
    expect(result).toBe('123456');
  });

  it('should handle a string with whitespaces', () => {
    const result = formatTextToNumber(' 1 2 3 asdfa');
    expect(result).toBe('123');
  });
});

describe('formatting phone number inputs', () => {
  it('should format an empty string to an empty string', () => {
    expect(formatPhoneNumber('')).toBe('');
  });

  it('should format a string with less than or equal to 3 digits', () => {
    expect(formatPhoneNumber('123')).toBe('(123');
  });

  it('should format a string with less than or equal to 6 digits', () => {
    expect(formatPhoneNumber('123456')).toBe('(123) 456');
  });

  it('should format a string with 6 to 10 digits', () => {
    expect(formatPhoneNumber('12345678')).toBe('(123) 456-78');
  });

  it('should format a string with 10 digits', () => {
    expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890');
  });

  it('should handle non-numeric characters', () => {
    expect(formatPhoneNumber('abc123def4567890')).toBe('(123) 456-7890');
  });

  it('should handle the minimum input length', () => {
    expect(formatPhoneNumber('1')).toBe('(1');
  });

  it('should handle the maximum input length', () => {
    expect(formatPhoneNumber('123456789012345')).toBe('(123) 456-7890');
  });
});

describe('unformatting phone number and adding US area code', () => {
  test('should unformat phone number', () => {
    expect(unformatPhoneNumberAndAddAreaCode('(000)000-0000')).toBe('+10000000000');
  });

  test('should unformat phone number with area code and empty string', () => {
    expect(unformatPhoneNumberAndAddAreaCode('+1 (000)000-0000')).toBe('+10000000000');
  });

  test('should unformat phone number with area code', () => {
    expect(unformatPhoneNumberAndAddAreaCode('+1(000)000-0000')).toBe('+10000000000');
  });
});

describe('removing area code if exists', () => {
  it("should remove area code if the input starts with '+1'", () => {
    const result = removeAreaCodeFromPhoneNumber('+123456789021');
    expect(result).toBe('23456789021');
  });

  it('should handle input with no area code', () => {
    const result = removeAreaCodeFromPhoneNumber('123456789022');
    expect(result).toBe('123456789022');
  });

  it('should handle empty string input', () => {
    const result = removeAreaCodeFromPhoneNumber('');
    expect(result).toBe('');
  });
});
