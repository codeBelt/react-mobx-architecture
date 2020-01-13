import HttpErrorResponseModel from './HttpErrorResponseModel';

export type SuccessfulResponse<T> = { data: T; error?: undefined };
export type UnsuccessfulResponse<T> = { data?: undefined; error: HttpErrorResponseModel };
export type APIResponse<T, E = undefined> = SuccessfulResponse<T> | UnsuccessfulResponse<E>;
