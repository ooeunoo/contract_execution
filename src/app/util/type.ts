export const isTrue = (value) => {
  if (typeof value === 'string') {
    value = value.trim().toLowerCase();
  }

  switch (value) {
    case true:
    case 'true':
    case 1:
    case '1':
      return true;
    default:
      return false;
  }
};
