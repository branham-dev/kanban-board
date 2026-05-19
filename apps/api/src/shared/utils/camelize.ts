export const camelize = (obj: Record<string, unknown>, action?: boolean | undefined) => {
  if (!obj) return obj;

  const result = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (action === true) {
        return [key.split('_')[0], value];
      }
      return [key.replace(/_([a-z])/g, (_, char) => char.toUpperCase()), value];
    }),
  );
  return result;
};
