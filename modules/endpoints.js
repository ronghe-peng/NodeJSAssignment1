const database = require("./database");

module.exports = app => {
  // Operate insert product

  app.post("/api/product", async (request, response) => {
    console.log(request.url);
    const name = request.query.name;
    const price = request.query.price;
    const picture = request.query.picture;

    let message = {
      success: true,
      message: "Product added"
    };

    const res = database.insertProduct(name, price, picture);
    message.data = res[0];
    response.send(message);
  });

  // Operate get all products

  app.get("/api/product", async (request, response) => {
    const data = database.getProducts();
    response.send(data);
  });

  // Operate get shoppingcart

  app.get("/api/shoppingcart", async (request, response) => {
    const data = database.getCart();
    response.send(data);
  });

  // Operate insert to shoppingcart

  app.post("/api/shoppingcart", async (request, response) => {
    console.log(request.url);
    const name = request.query.name;
    const price = request.query.price;
    const picture = request.query.picture;

    let message = {
      success: true,
      message: "Shoppingcart updated"
    };

    // Operate
    const checkShopedItem = database.shopedItem(name, price, picture); // Export function from 'database.js'
    const checkProducts = database.availableProduct(name, price, picture); // Export function from 'database.js'

    if (checkShopedItem) {
      //  Check if item exist in shoppingcart
      console.log(checkShopedItem);
      const errorMessage1 = {
        error: "ERROR",
        message: "Item is already selected"
      };
      response.send(errorMessage1);
    } else if (!checkProducts) {
      //  Check if item exist in product list
      const errorMessage2 = {
        error: "ERROR",
        message: "Item is not available"
      };
      response.send(errorMessage2);
    } else {
      // Insert item
      const res = database.insertCart(name, price, picture);
      message.data = res[0];
      response.send(message);
    }
  });
  // Operate delete
  app.delete("/api/shoppingcart", async (request, response) => {
    console.log(request.url);
    const name = request.query.name;
    const price = request.query.price;
    const picture = request.query.picture;

    let message = {
      success: true,
      message: "Item deleted"
    };

    const checkShopedItem = database.shopedItem(name, price, picture); // Export function from 'database.js'

    if (checkShopedItem) {
      //  Check if item exist in shoppingcart
      //  Delete item
      const res = database.deletCart(name, price, picture);
      message.data = res[0];
      response.send(message);
    } else {
      const errorMessage = {
        error: "ERROR",
        message: "Item is not in shoppingcart"
      };
      response.send(errorMessage);
    }
  });
};
