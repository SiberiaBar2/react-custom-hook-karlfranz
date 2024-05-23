const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
type Key<T> = keyof T;
export const cleanObject = <T extends any>(obj?: T) => {
  if (!obj) {
    return {} as T;
  }

  const result = { ...obj } as T;

  Object.keys(result as Key<T>).forEach((key) => {
    if (isVoid(result[key as Key<T>])) {
      delete result[key as Key<T>];
    }
  });

  return result;
};

export const generateUniqueString = () => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2);
  return timestamp + randomString;
};
