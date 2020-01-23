import HttpErrorResponseModel from './HttpErrorResponseModel';

export type SuccessfulResponse<T> = { data: T; error?: never };
export type UnsuccessfulResponse<T> = { data?: never; error: HttpErrorResponseModel };
export type APIResponse<T, E = never> = SuccessfulResponse<T> | UnsuccessfulResponse<E>;
