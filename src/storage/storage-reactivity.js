import LocalStorageError from './storage-error';
import { parseIfJSON, isObject } from '../utils';
import { ref, watch } from 'vue';

/**
 * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
 * If a JSON object value is provided, this will be automatically be serialized.
 * @param {*} key - Key
 * @param {*} value - Value
 */
const writeData = function writeDataToLocalStorage(key, value) {
  const formattedValue = isObject(value) ? JSON.stringify(value) : value;
  localStorage.setItem(key, formattedValue);
};

/**
 * Retrieves a reactive reference to a value in local storage.
 * Throws an error if the specified key does not exist in local storage.
 * Continuously checks for changes in the local storage value and updates the reactive reference accordingly.
 *
 * @param {string} key - The key to retrieve from local storage.
 * @returns {Object} - A reactive reference to the value associated with the specified key in local storage.
 * @throws {LocalStorageError} - Throws an error if the specified key does not exist in local storage.
 */
export function useGetReactiveStorage(key) {
  const item = localStorage.getItem(key);

  if (item === null) {
    throw new LocalStorageError(
      `The key ${key} does not exist in the current local storage`
    );
  }

  const reactiveItem = ref(parseIfJSON(item));

  setInterval(() => {
    const checkingValue = localStorage.getItem(key);
    if (checkingValue !== reactiveItem.value) {
      reactiveItem.value = parseIfJSON(checkingValue);
    }
  }, 500);

  return reactiveItem;
}

/**
 * Sets a reactive object to local storage and updates the storage whenever the reactive object changes.
 * Throws an error if the key or reactive object is not provided, or if the provided object is not reactive.
 *
 * @param {string} key - The key under which to store the value in local storage.
 * @param {Object} reactiveObject - The reactive object to store in local storage. Must be a Vue reactive object (ref/computed).
 * @throws {LocalStorageError} - Throws an error if the key is not provided, the reactive object is null, or the object is not reactive.
 */
export function useSetReactiveStorage(key, reactiveObject) {
  if (!key) {
    throw new LocalStorageError('Key value not provided');
  }

  if (!reactiveObject) {
    throw new LocalStorageError('Set value cannot be null');
  }

  if (typeof reactiveObject !== 'object') {
    throw new LocalStorageError(
      'Variable must be a Vue reactive object (ref/computed)'
    );
  }

  writeData(key, reactiveObject.value);

  watch(reactiveObject, () => writeData(key, reactiveObject.value), {
    deep: true,
  });
}
