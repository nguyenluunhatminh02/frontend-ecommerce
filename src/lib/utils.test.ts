import { describe, expect, it } from 'vitest';
import { generateQueryString, getDiscountPercentage, isJwtExpired, slugify } from '@/lib/utils';

function createJwt(expSecondsFromNow: number): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + expSecondsFromNow })).toString('base64url');
  return `${header}.${payload}.signature`;
}

describe('isJwtExpired', () => {
  it('returns true for missing or malformed tokens', () => {
    expect(isJwtExpired(undefined)).toBe(true);
    expect(isJwtExpired('bad-token')).toBe(true);
  });

  it('returns false for a valid unexpired token', () => {
    expect(isJwtExpired(createJwt(3600))).toBe(false);
  });

  it('returns true for an expired token', () => {
    expect(isJwtExpired(createJwt(-60))).toBe(true);
  });
});

describe('generateQueryString', () => {
  it('omits empty values and serializes defined params', () => {
    expect(generateQueryString({
      keyword: 'camera',
      page: 2,
      size: 24,
      empty: '',
      nope: null,
      missing: undefined,
    })).toBe('keyword=camera&page=2&size=24');
  });
});

describe('slugify', () => {
  it('normalizes vietnamese text into URL-friendly slugs', () => {
    expect(slugify('Điện thoại Cao Cấp 2026')).toBe('dien-thoai-cao-cap-2026');
  });
});

describe('getDiscountPercentage', () => {
  it('returns a rounded discount when compare price is higher', () => {
    expect(getDiscountPercentage(80, 100)).toBe(20);
  });

  it('returns zero when compare price is missing or not greater', () => {
    expect(getDiscountPercentage(100, 0)).toBe(0);
    expect(getDiscountPercentage(100, 100)).toBe(0);
  });
});