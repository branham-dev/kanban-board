type QueryResponse = Record<string, unknown>;

type CamelizeInput = QueryResponse | QueryResponse[] | null | undefined;

export const camelize = <T extends CamelizeInput>(response: T, action?: boolean | undefined): T => {
  if (response == null) return response;

  if (Array.isArray(response)) {
    return response.map((object) => camelize(object, action)) as T;
  }

  const result = Object.fromEntries(
    Object.entries(response).map(([key, value]) => {
      if (action === true) {
        return [key.split('_')[0], value];
      }
      return [key.replace(/_([a-z])/g, (_, char) => char.toUpperCase()), value];
    }),
  );
  return result;
};
