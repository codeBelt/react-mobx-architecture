import uuid from 'uuid/v4';
import IError from './IError';
import { BaseModel } from 'sjs-base-model';

export default class HttpErrorResponseModel extends BaseModel implements IError {
  readonly id: string = uuid();
  status: number = 0;
  message: string = '';
  errors: string[] = [];
  url: string = '';
  raw: any = null;

  constructor(data: RecursivePartial<HttpErrorResponseModel>) {
    super();

    this.update(data);
  }
}
