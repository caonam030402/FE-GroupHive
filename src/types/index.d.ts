export interface IErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

export interface ISuccessResponse<Data> {
  status: number;
  payload: Data;
}

export interface IHttpResponse<Data> {
  ok: boolean;
  status: number;
  payload: Data;
}
