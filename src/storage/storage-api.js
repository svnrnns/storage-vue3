import { parseIfJSON, isObject } from '../utils';
import LocalStorageError from './storage-error';

/**
 * Retrieves the value assigned to the given key from the local storage.
 * @param {*} key - The key to look for.
 * @throws {LocalStorageError} Throws an error if the key does not exist in the storage.
 * @returns The value. If the value is a dictionary-like object, it will be deserialized.
 */
export function useGetStorage(key) {
  const item = localStorage.getItem(key);

  if (item === null)
    throw new LocalStorageError(
      `The key ${key} does not exists in the current local storage`
    );

  return parseIfJSON(item);
}

/**
 * Sets a value to a key in the local storage. Serializes the data if the value is a dictionary-like object.
 * @param {*} key - The key.
 * @param {*} value - The value.
 * @throws {LocalStorageError} Throws an error if the key is not provided.
 */
export function useSetStorage(key, value) {
  if (!key) {
    throw new LocalStorageError('Key value not provided');
  }

  const formattedValue = isObject(value) ? JSON.stringify(value) : value;

  localStorage.setItem(key, formattedValue);
}

/**
 * Checks whether a key exists or not in the local storage.
 * @param {*} key - The key to check if exists
 * @returns True if exists, false if not
 */
export function useExistsStorage(key) {
  const item = localStorage.getItem(key);

  if (item === null) return false;
  else return true;
}

/**
 * Removes a key and its value from the local storage.
 * @param {*} key - The key.
 */
export function useRemoveKeyStorage(key) {
  localStorage.removeItem(key);
}

/**
 * Dumps the entire local storage. Bye.
 */
export function useClearAllStorage() {
  localStorage.clear();
}

/**
 * @returns The total length of the local storage.
 */
export function useGetLengthStorage() {
  return localStorage.length;
}
