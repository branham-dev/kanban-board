export function isPgError(error: unknown) {
  return typeof error === 'object' && error !== null && 'code' in error;
}
