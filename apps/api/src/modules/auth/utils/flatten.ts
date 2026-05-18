type TreeifiedError = {
  properties?: Record<string, { errors: string[] }>;
};

export const flattenError = (data: TreeifiedError) => {
  const flatErrors = Object.fromEntries(
    Object.entries(data.properties ?? {}).map(([key, value]) => [key, value.errors]),
  );
  return flatErrors;
};
