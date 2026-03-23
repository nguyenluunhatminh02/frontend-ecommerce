import { describe, expect, it } from 'vitest';
import { buildProductQueryParams } from '@/lib/product-query';

describe('buildProductQueryParams', () => {
  it('normalizes search state into backend filter params', () => {
    const params = buildProductQueryParams(
      {
        keyword: 'camera',
        brandId: 'brand-1',
        minPrice: '100',
        maxPrice: '500',
        rating: '4',
        sortBy: 'price',
        sortDir: 'asc',
        page: 2,
      },
      'category-123'
    );

    expect(params).toEqual({
      keyword: 'camera',
      categoryId: 'category-123',
      brandId: 'brand-1',
      minPrice: 100,
      maxPrice: 500,
      minRating: 4,
      sortBy: 'price',
      sortDirection: 'asc',
      page: 2,
      size: 24,
    });
  });

  it('falls back to defaults when optional values are empty', () => {
    const params = buildProductQueryParams({}, undefined);

    expect(params).toEqual({
      keyword: undefined,
      categoryId: undefined,
      brandId: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
      sortBy: 'createdAt',
      sortDirection: 'desc',
      page: 0,
      size: 24,
    });
  });
});