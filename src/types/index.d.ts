export interface IErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

export interface ISuccessResponse<Data> {
  status: number;
  payload: Data;
}
