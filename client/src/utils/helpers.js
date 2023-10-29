//exports function to validate email

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + "s";
}
//creates a db spark-shopper and object stores in indexedDB and
//perform get, put and delete operations based on method inside products, categories and cart

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("spark-shopper", 1);
    let db, tx, store;
    request.onupgradeneeded = function (e) {
      const db = request.result;
      db.createObjectStore("products", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" });
      db.createObjectStore("subcategories", { keyPath: "_id" });
      db.createObjectStore("cart", { keyPath: "_id" });
      db.createObjectStore("wishList", { keyPath: "_id" });
      db.createObjectStore("singleProduct", { keyPath: "_id" });
      db.createObjectStore("comments", { keyPath: "_id" });
    };

    request.onerror = function (e) {
      console.log("There was an error");
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(storeName, "readwrite");
      store = tx.objectStore(storeName);

      db.onerror = function (e) {
        console.log("error", e);
      };
      //performs the operations put, get , delete and clear based on method
      switch (method) {
        case "put":
          store.put(object);
          resolve(object);
          break;
        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case "delete":
          store.delete(object._id);
          break;
        case "clear":
          store.clear();
          break;
        default:
          console.log("No valid method");
          break;
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
