export const narrowError = (error: unknown): string => {
  const ERROR_MESSAGE = 'An unknown error occured. Try again later.';

  if (typeof error !== 'object' || error === undefined || error === null) {
    return ERROR_MESSAGE;
  }

  if (
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'message' in error.data &&
    typeof error.data.message === 'string'
  ) {
    return error.data.message;
  }

  if ('status' in error && error.status === 'FETCH_ERROR') {
    return 'Server unavailable. Check your backend.';
  }

  return ERROR_MESSAGE;
};
