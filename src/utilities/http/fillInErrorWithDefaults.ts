import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import { isDefined } from '../miscUtil';

export const fillInErrorWithDefaults = (error: Partial<HttpErrorResponseModel>, request: Partial<Request>): HttpErrorResponseModel => {
  const errors = error.errors!.length ? error.errors! : ['Error requesting data'];

  return new HttpErrorResponseModel({
    status: error.status || 0,
    message: error.message || 'Error requesting data',
    url: error.url || request.url!,
    raw: error.raw,
    // Remove anything with undefined or empty strings.
    errors: errors.filter(isDefined),
  });
};
