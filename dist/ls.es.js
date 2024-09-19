import { ref as i, watch as u } from "vue";
class s extends Error {
  constructor(e) {
    super(e), this.name = "LocalStorageError";
  }
}
function l(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t);
}
function g(t) {
  try {
    const e = JSON.parse(t);
    return typeof e == "object" && e !== null && !Array.isArray(e);
  } catch {
    return !1;
  }
}
function a(t) {
  return g(t) ? JSON.parse(t) : t;
}
const c = function(e, r) {
  const o = l(r) ? JSON.stringify(r) : r;
  localStorage.setItem(e, o);
};
function f(t) {
  const e = localStorage.getItem(t);
  if (e === null)
    throw new s(
      `The key ${t} does not exist in the current local storage`
    );
  const r = i(a(e));
  return setInterval(() => {
    const o = localStorage.getItem(t);
    o !== r.value && (r.value = a(o));
  }, 500), r;
}
function m(t, e) {
  if (!t)
    throw new s("Key value not provided");
  if (!e)
    throw new s("Set value cannot be null");
  if (typeof e != "object")
    throw new s(
      "Variable must be a Vue reactive object (ref/computed)"
    );
  c(t, e.value), u(e, () => c(t, e.value), {
    deep: !0
  });
}
function h(t) {
  const e = localStorage.getItem(t);
  if (e === null)
    throw new s(
      `The key ${t} does not exists in the current local storage`
    );
  return a(e);
}
function S(t, e) {
  if (!t)
    throw new s("Key value not provided");
  const r = l(e) ? JSON.stringify(e) : e;
  localStorage.setItem(t, r);
}
function p(t) {
  return localStorage.getItem(t) !== null;
}
function y(t) {
  localStorage.removeItem(t);
}
function d() {
  localStorage.clear();
}
function w() {
  return localStorage.length;
}
class N {
  constructor(e = "") {
    this.namespace = e;
  }
  _getNamespacedKey(e) {
    return this.namespace ? `${this.namespace}:${e}` : e;
  }
  getNamespace() {
    return this.namespace;
  }
  setNamespace(e) {
    if (!e)
      throw new s("Namespace variable not provided");
    if (typeof e != "string")
      throw new s("Namespace variable must be of type string");
    this.namespace = e;
  }
  getRef(e) {
    const r = this._getNamespacedKey(e);
    return f(r);
  }
  setRef(e, r) {
    const o = this._getNamespacedKey(e);
    m(o, r);
  }
  get(e) {
    const r = this._getNamespacedKey(e);
    return h(r);
  }
  set(e, r) {
    const o = this._getNamespacedKey(e);
    S(o, r);
  }
  exists(e) {
    const r = this._getNamespacedKey(e);
    return p(r);
  }
  remove(e) {
    const r = this._getNamespacedKey(e);
    y(r);
  }
  clear() {
    d();
  }
  length() {
    return w();
  }
}
const n = new N(), I = (t) => n.getRef(t), K = (t, e) => n.setRef(t, e), R = (t) => n.get(t), x = (t, e) => n.set(t, e), _ = (t) => n.exists(t), b = (t) => n.remove(t), J = () => n.clear(), L = () => n.length();
export {
  J as clear,
  N as default,
  _ as exists,
  R as get,
  I as getRef,
  L as length,
  b as remove,
  x as set,
  K as setRef
};
