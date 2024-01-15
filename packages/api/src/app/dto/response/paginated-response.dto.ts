export class PaginatedResponse<TData> {
  total: number;
  totalPage: number;
  limit: number;
  page: number;
  results: TData[];
}
