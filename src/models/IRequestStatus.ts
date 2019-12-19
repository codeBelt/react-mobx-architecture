import HttpErrorResponseModel from './HttpErrorResponseModel';

export interface IRequestStatus<T = undefined> {
  isRequesting: boolean;
  data: T | undefined;
  error: HttpErrorResponseModel | undefined;
  meta: any;
}

export const initialRequestStatus = <T>(defaultValue: T): IRequestStatus<T> => ({
  isRequesting: false,
  error: undefined,
  data: defaultValue,
  meta: null,
});
