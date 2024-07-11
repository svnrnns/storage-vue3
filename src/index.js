import Storage from './storage/Storage.js';

// Local Storage
const defaultLocalStorage = new Storage();

const getRef = (key) => defaultLocalStorage.getRef(key);
const setRef = (key, value) => defaultLocalStorage.setRef(key, value);
const get = (key) => defaultLocalStorage.get(key);
const set = (key, value) => defaultLocalStorage.set(key, value);
const exists = (key) => defaultLocalStorage.exists(key);
const remove = (key) => defaultLocalStorage.remove(key);
const clear = () => defaultLocalStorage.clear();
const length = () => defaultLocalStorage.length();

export default Storage;
export { getRef, setRef, get, set, exists, remove, clear, length };
