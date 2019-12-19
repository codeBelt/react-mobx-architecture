import HttpErrorResponseModel from './HttpErrorResponseModel';

export interface IResponseStatus<T> {
  isRequesting: boolean;
  data: T;
  error: HttpErrorResponseModel | null;
}

export const initialResponseStatus = <T>(defaultValue: T): IResponseStatus<T> => ({
  isRequesting: false,
  error: null,
  data: defaultValue,
});
