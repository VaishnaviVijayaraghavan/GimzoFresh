// create express app
const exp = require("express");
const app = exp();
const path = require("path");

//import dotenv
require("dotenv").config();

//connect react build
app.use(exp.static(path.join(__dirname, "./build")));

//import mongo client
const mc = require("mongodb").MongoClient;

//cluster url
const db_url = process.env.DATABASE_URL;

//connect with mongodb atlas
mc.connect(db_url)
  .then((client) => {
    //get Database object
    const dbObj = client.db("db026");

    //get usercollection object
    const userCollectionObject = dbObj.collection("usercollection");

    //get productCollection object
    const productCollectionObject = dbObj.collection("productcollection");

    //share collection object
    app.set("userCollectionObject", userCollectionObject);

    //share collection object
    app.set("productCollectionObject", productCollectionObject);

    console.log("Connected to DB successfully");
  })
  .catch((err) => {
    console.log("error in DB connections ", err);
  });

//import APIs
const userApp = require("./APIs/userApi");
const productApp = require("./APIs/productApi");

//if path starts with /user
app.use("/user", userApp);

//if path starts with /product
app.use("/product", productApp);

//to parse body of request object - client req is JSON (converting Json to JS)
app.use(exp.json());

//create test middleware
// const testMiddleware = (request, response, next) => {
//   console.log("Middleware excuted");
//send response
//response.send({ message: "this is a message from middleware" });
// forward req to next middleware
//   next();
// };

//use middleware for each req
// app.use(testMiddleware);
//app.use(path,middleware) for specific path

//assign port
//dealing with page refresh
app.use("*", (request, response) => {
  response.sendFile(path.join(__dirname, "./build/index.html"));
});

//handling invalid paths
app.use((request, response, next) => {
  response.send({ message: `path ${request.url} is invalid` });
});

//error handling middleware
app.use((error, request, response, next) => {
  response.send({ message: "Error occurred", reason: `${error.message}` });
});

const port = process.env.PORT;
app.listen(port, () => console.log("server on port ${port}...."));
