//seperate route for productApi (mini express app)
const { request } = require("express");
const exp = require("express");
const productApp = exp.Router();

//body parsing middleware
productApp.use(exp.json());

//product api

//
//
//create API(request handler) Product API
//getuproducts
productApp.get("/getproducts", async (request, response) => {
  //get product object
  let productCollectionObject = request.app.get("productCollectionObject");

  //fetch the products
  let products = await productCollectionObject.find().toArray();

  //response
  response.send({ message: "All Products", payload: products });
});

//
//
//get products by name
productApp.get("/getproducts/:productname", async (request, response) => {
  //get product object
  let productCollectionObject = request.app.get("productCollectionObject");

  //get product name from url
  productnameFromUrl = request.params.productname;

  //get product from db
  let productFromDb = await productCollectionObject.findOne({
    productname: productnameFromUrl,
  });

  //if object exist or not
  if (productFromDb == null) {
    response.send({ message: "Product doesnot exist" });
  } else {
    response.send({ message: "Product", payload: productFromDb });
  }
});

//
//
//create-products
productApp.post("/createproduct", async (request, response) => {
  let productCollectionObject = request.app.get("productCollectionObject");

  let productFromClient = request.body;
  //console.log(productFromClient);

  let productFromDb = await productCollectionObject.findOne({
    productname: productFromClient.productname,
  });

  if (productFromDb != null) {
    response.send({ message: "Product already exists" });
  } else {
    await productCollectionObject.insertOne(productFromClient);
    response.send({ message: "Product Created" });
  }
});

//
//
//update-product
productApp.put("/updateproduct", async (request, response) => {
  let productCollectionObject = request.app.get("productCollectionObject");

  let modifiedProduct = request.body;

  await productCollectionObject.updateOne(
    { productname: modifiedProduct.productname },
    { $set: { ...modifiedProduct } }
  );

  response.send({ message: "Product Updated" });
});

//
//
//remove-product

productApp.delete("/removeproduct/:productid", async (request, response) => {
  let productCollectionObject = request.app.get("productCollectionObject");

  let productidFromURL = request.params.productid;
  console.log(productidFromURL);

  let productFromDb = await productCollectionObject.findOne({
    productid: productidFromURL,
  });
  console.log(productFromDb);

  if (productFromDb != null) {
    await productCollectionObject.delete(productFromDb);
    response.send({ message: "Product deleted" });
  }
});

//exporting productApp
module.exports = productApp;
