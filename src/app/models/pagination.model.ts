export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}