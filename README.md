# Storage Vue 3

Storage Vue 3 is a package designed to enhance the local storage experience in Vue 3 applications. It offers an easy-to-use API and incorporates several exciting features, including:

- Automatic serialization and deserialization of objects.
- Adding reactivity to any action performed by the package itself.

## Table of Contents

- [Features](#features)
- [Install](#installation)
- [Usage](#usage)
- [Object serialization](#object-serialization)
- [How Reactivity works](#how-reactivity-works)
- [API](#api)

## Features

### Simple API:

- A simple and intuitive API for developers to interact with local storage, including methods for setting, getting, updating, and deleting data.

### Reactivity:

- Enable reactivity on local storage data, ensuring that changes automatically trigger re-renders in Vue components utilizing the data.
- Bi-directional reactivity is supported, allowing for both reading and writing data with seamless updates in Vue components.

### Serialization and Deserialization:

- Automatically handles serialization and deserialization of complex data types such as objects and arrays when storing and retrieving data from local storage.

### Namespacing:

- Create a prefix to the data within local storage to prevent naming conflicts with other parts of the application or other applications using local storage or cookies.

### Error Handling:

- Improved error handling with customized error messages and formats for a better understanding and handling.

## Installation

```bash
$ npm install storage-vue3
```

## Usage

[Install](#installation) the package.

You can create an instance of the Storage class to create a namespace.

```js
// Basic Usage
import { getRef } from 'storage-vue3';
const reactiveToken = getRef('token');

// With namespace
// Note that this will read 'namespace:token'
import Storage from 'storage-vue3';

const storage = new Storage('namespace');
const reactiveToken = storage.getRef('token');
```

## Object serialization

This wonderful package makes the storage and retrieval of object data an easy task.

```js
import { get, set } from 'storage-vue3';
const sampleCart = {
  name: 'Kiwi',
  qty: 24,
  img: 'public/assets/kiwis.png',
};

set('myCart', sampleCart); // Object succesfully serialized
const cart = get('myCart'); // Object succesfully deserialized
```

## How Reactivity works

The reactivity feature facilitates real-time updates of data stored in local storage. This ensures that when a value in local storage changes, any Vue components utilizing the reactive data will automatically update to reflect the new value, eliminating the need for manual intervention.

### Implementation Details

The reactivity mechanism is implemented using Vue's Composition API (Vue 3). When using the `getRef()` or `setRef()` method a reactive reference is generated for the specified key in local storage. This reactive reference is dynamically linked to the corresponding value in local storage, ensuring automatic updates whenever the value changes.
<br />
For data retrieval, use the `getRef()` function, which returns a reactive varibale `ref()`.

```js
const reactiveData = getRef('token');
```

Now `reactiveData` will automatically update its value whenever the value of `token` changes in the local storage.
<br />
<br />
For data storage, use the `setRef()` function.

```js
const reactiveVariable = ref('something');
set('token', reactiveVariable);
```

By binding `reactiveVariable` to the key **token** in local storage, any changes to the variable will automatically reflect in the corresponding local storage value, ensuring seamless synchronization between Vue components and local storage.

## API

### Constructor

| Param     | Type   | Nullable | Desc                       |
| --------- | ------ | -------- | -------------------------- |
| namespace | string | &check;  | Namespace of this instance |

### getNamespace

Retrieves the namespace linked to this Fallon instance.

### setNamespace

Updates the namespace for this Fallon instance. <br/>
Throws a **LocalStorageError** if the param is left empty. <br/>
Throws a **LocalStorageError** if the param is not of type string.

| Param     | Type   | Nullable | Desc                           |
| --------- | ------ | -------- | ------------------------------ |
| namespace | string | &cross;  | New namespace of this instance |

### get

Retrieves the value linked to the given key from the local storage. <br />
Throws a **LocalStorageError** if the key does not exist in the storage.

| Param | Type | Nullable | Desc    |
| ----- | ---- | -------- | ------- |
| key   | any  | &cross;  | The key |

### set

Sets a value to a key in the local storage. Serializes the data if the value is a dictionary-like object. <br/>
Throws an **LocalStorageError** if the key is not provided.

| Param | Type | Nullable | Desc      |
| ----- | ---- | -------- | --------- |
| key   | any  | &cross;  | The key   |
| value | any  | &cross;  | The value |

### getRef

Retrieves a reactive reference to a value in local storage. <br />
Continuously checks for changes in the local storage value and updates the reactive reference accordingly. <br />
Throws an **LocalStorageError** if the provided key does not exist in the current local storage.
| Param | Type | Nullable | Desc |
|-----------|--------|----------|----------------------------|
| key | any | &cross; | The key |

### setRef

Sets a reactive object to local storage and updates the storage whenever the reactive object changes. <br />
Throws an **LocalStorageError** if the key or reactive object is not provided, or if the provided object is not reactive.
| Param | Type | Nullable | Desc |
|-----------|--------|----------|----------------------------|
| key | any | &cross; | The key |
| reactiveObject | any | &cross; | The reactive variable

### exists

Checks whether a key exists in the local storage or not.
| Param | Type | Nullable | Desc |
|-----------|--------|----------|----------------------------|
| key | any | &cross; | The key |

### remove

Removes a key and its value from the local storage.
| Param | Type | Nullable | Desc |
|-----------|--------|----------|----------------------------|
| key | any | &cross; | The key |

### clear

Dumps the entire local storage.

### length

Returns the total length of the local storage.
