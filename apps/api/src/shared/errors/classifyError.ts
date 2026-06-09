import { AppError } from './app.error';
import { isPgError } from './guards';

export const classifyError = (error: unknown) => {
  if (isPgError(error)) {
    if (error.code === 'ECONNREFUSED') {
      return new AppError('Database service unavailable. Please try again later.', 503, null);
    }
  } else {
    return new AppError('Server unspecified error', 500, null);
  }
};
