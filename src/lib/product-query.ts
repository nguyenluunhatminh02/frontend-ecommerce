import { ProductFilterParams } from '@/types';

export interface ProductSearchState {
  keyword?: string;
  brandId?: string;
  minPrice?: string;
  maxPrice?: string;
  rating?: string;
  sortBy?: string;
  sortDir?: string;
  page?: number;
}

export function buildProductQueryParams(
  state: ProductSearchState,
  resolvedCategoryId?: string
): ProductFilterParams {
  return {
    keyword: state.keyword || undefined,
    categoryId: resolvedCategoryId || undefined,
    brandId: state.brandId || undefined,
    minPrice: state.minPrice ? Number(state.minPrice) : undefined,
    maxPrice: state.maxPrice ? Number(state.maxPrice) : undefined,
    minRating: state.rating ? Number(state.rating) : undefined,
    sortBy: state.sortBy || 'createdAt',
    sortDirection: (state.sortDir || 'desc') as 'asc' | 'desc',
    page: state.page ?? 0,
    size: 24,
  };
}