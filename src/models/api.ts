import HttpErrorResponseModel from './HttpErrorResponseModel';

export type SuccessfulResponse<T> = { data: T; error?: null };
export type UnsuccessfulResponse<T> = { data?: null; error: HttpErrorResponseModel };
export type APIResponse<T, E = null> = SuccessfulResponse<T> | UnsuccessfulResponse<E>;
