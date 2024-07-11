function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

function isJSON(str) {
  try {
    const obj = JSON.parse(str);
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
  } catch (error) {
    return false;
  }
}

function parseIfJSON(item) {
  return isJSON(item) ? JSON.parse(item) : item;
}

export { isObject, isJSON, parseIfJSON };
