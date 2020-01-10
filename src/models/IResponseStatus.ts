import HttpErrorResponseModel from './HttpErrorResponseModel';

export interface IResponseStatus<T> {
  isRequesting: boolean;
  data: T;
  error?: HttpErrorResponseModel;
}
export type UnknownResponseStatus<T> = Optional<IResponseStatus<T>, 'error' | 'data'>;

export const initialResponseStatus = <T>(defaultValue: T): IResponseStatus<T> => ({
  isRequesting: false,
  data: defaultValue,
});
