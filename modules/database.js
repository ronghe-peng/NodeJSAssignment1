const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("eshop.json");
const database = lowdb(adapter);

exports.initiateProducts = () => {
  const databaseInitiated1 = database.has("products").value();

  if (!databaseInitiated1) {
    database.defaults({ products: [] }).write();
  }

  const databaseInitiated2 = database.has("shoppingcart").value();

  if (!databaseInitiated2) {
    database.defaults({ shoppingcart: [] }).write();
  }
};

// Insert all products

exports.insertProduct = async (name, price, picture) => {
  const response = await database
    .get("products")
    .push({ name: name, price: price, picture: picture })
    .write();
  return response;
};

// Get all products

exports.getProducts = () => {
  return database.get("products").value();
};

// Insert item in shoppingcart

exports.insertCart = async (name, price, picture) => {
  const response = await database
    .get("shoppingcart")
    .push({ name: name, price: price, picture: picture })
    .write();
  return response;
};

// Get items in shoppingcart

exports.getCart = () => {
  return database.get("shoppingcart").value();
};

// Delet items in shoppingcart

exports.deletCart = async name => {
  const response = await database
    .get("shoppingcart")
    .remove({ name: name })
    .write();
  return response;
};

// Check if item exist in shoppingcart for POST

exports.shoppingcartItem = (name, price, picture) => {
  const response = database
    .get("shoppingcart")
    .find({ name: name, price: price, picture: picture })
    .value();
  return response;
};

// Check if item exist in shoppingcart for DELETE

exports.shopedItem = (name /*, price, picture*/) => {
  const response = database
    .get("shoppingcart")
    .find({ name: name /*, price: price, picture: picture*/ })
    .value();
  return response;
};

// Check if item exists in productlist

exports.availableProduct = (name, price, picture) => {
  const response = database
    .get("products")
    .find({ name: name, price: price, picture: picture })
    .value();
  return response;
};
