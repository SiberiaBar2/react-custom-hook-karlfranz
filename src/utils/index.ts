const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
export const cleanObject = (obj?: { [key: string]: unknown }) => {
  if (!obj) {
    return {};
  }

  const result = { ...obj };

  Object.keys(result).forEach((key) => {
    if (isVoid(result[key])) {
      delete result[key];
    }
  });

  return result;
};

export const generateUniqueString = () => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2);
  return timestamp + randomString;
};
