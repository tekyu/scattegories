export const isObjectEmpty = (obj) => {
  if (Object.keys(obj).length > 0) {
    return false;
  }
  return true;
};
