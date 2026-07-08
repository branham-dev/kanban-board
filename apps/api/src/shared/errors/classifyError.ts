import { AppError } from './app.error';
import { isPgError, isSyntaxError } from './guards';

export const classifyError = (error: unknown): AppError => {
  if (isPgError(error)) {
    if (error.code === 'ECONNREFUSED') {
      return new AppError('Database service unavailable. Please try again later.', 503, null);
    }
    return new AppError('Database unclassified error occured', 500, null);
  }

  if (isSyntaxError(error)) {
    if (error.message.includes('valid JSON')) {
      return new AppError('Invalid JSON payload', 400, null);
    }
  }

  return new AppError('Server unclassified error', 500, null);
};
