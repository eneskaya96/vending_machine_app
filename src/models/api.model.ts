
export interface ApiResponse<T> {
  data: T;
  statusCode: number;
  message?: string;
  success: boolean;
}

export enum HttpMethod {
  Delete = 'DELETE',
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
}
