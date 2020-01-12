import { isDefined } from '../miscUtil';
import { fillInErrorWithDefaults } from './fillInErrorWithDefaults';

export const createResponseError = (error: any, restRequest: Partial<Request>) => {
  if (error.response) {
    // The request was made and the server responded with a status code that falls out of the range of 2xx
    const { status, statusText, data } = error.response;
    const errors: string[] = data.hasOwnProperty('errors') ? [statusText, ...data.errors] : [statusText];

    return fillInErrorWithDefaults(
      {
        status,
        message: errors.filter(isDefined).join(' - '),
        errors,
        url: error.request.responseURL,
        raw: error.response,
      },
      restRequest
    );
  } else if (error.request) {
    // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
    const { status, statusText, responseURL } = error.request;

    return fillInErrorWithDefaults(
      {
        status,
        message: statusText,
        errors: [statusText],
        url: responseURL,
        raw: error.request,
      },
      restRequest
    );
  } else {
    // Something happened in setting up the request that triggered an Error
    return fillInErrorWithDefaults(
      {
        status: 0,
        message: error.message,
        errors: [error.message],
        url: restRequest.url!,
        raw: error,
      },
      restRequest
    );
  }
};
