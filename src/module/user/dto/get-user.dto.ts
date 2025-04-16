export interface getUserDto {
  page: number;
  limit?: number;
  username?: string;
  // select 下拉框
  role?: number;
  gender?: number;
}
