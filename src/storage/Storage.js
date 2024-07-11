import LocalStorageError from './storage-error';

import {
  useGetReactiveStorage,
  useSetReactiveStorage,
} from './storage-reactivity.js';

import {
  useGetStorage,
  useSetStorage,
  useExistsStorage,
  useRemoveKeyStorage,
  useClearAllStorage,
  useGetLengthStorage,
} from './storage-api.js';

export default class LS {
  constructor(namespace = '') {
    this.namespace = namespace;
  }

  _getNamespacedKey(key) {
    return this.namespace ? `${this.namespace}:${key}` : key;
  }

  getNamespace() {
    return this.namespace;
  }

  setNamespace(namespace) {
    if (!namespace) {
      throw new LocalStorageError('Namespace variable not provided');
    }
    if (typeof namespace != 'string') {
      throw new LocalStorageError('Namespace variable must be of type string');
    }
    this.namespace = namespace;
  }

  getRef(key) {
    const nskey = this._getNamespacedKey(key);
    return useGetReactiveStorage(nskey);
  }

  setRef(key, value) {
    const nskey = this._getNamespacedKey(key);
    useSetReactiveStorage(nskey, value);
  }

  get(key) {
    const nskey = this._getNamespacedKey(key);
    return useGetStorage(nskey);
  }

  set(key, value) {
    const nskey = this._getNamespacedKey(key);
    useSetStorage(nskey, value);
  }

  exists(key) {
    const nskey = this._getNamespacedKey(key);
    return useExistsStorage(nskey);
  }

  remove(key) {
    const nskey = this._getNamespacedKey(key);
    useRemoveKeyStorage(nskey);
  }

  clear() {
    useClearAllStorage();
  }

  length() {
    return useGetLengthStorage();
  }
}
