//seperate route for userApi (mini express app)
const { request, response } = require("express");
const exp = require("express");
const userApp = exp.Router();

//module used to hash the password
const bcryptjs = require("bcryptjs");

//module for json web token
const jwt = require("jsonwebtoken");

//body parsing middleware
userApp.use(exp.json());

require("dotenv").config();

//create API(request handler) User API

//
//
//getusers
userApp.get("/getusers", async (request, response) => {
  //get userCollectionObject
  let userCollectionObject = request.app.get("userCollectionObject");

  //find users
  let users = await userCollectionObject.find().toArray();

  //send responds
  response.send({ message: "User Data", payload: users });
});

//
//
//get user by username
userApp.get("/getusers/:username", async (request, response) => {
  //get userCollectionObject
  let userCollectionObject = request.app.get("userCollectionObject");

  //get username from url
  let usernameFromUrl = request.params.username;

  //find user
  let userFromDb = await userCollectionObject.findOne({
    username: usernameFromUrl,
  });

  if (userFromDb == null) {
    response.send({ message: "User Not Found" });
  } else {
    response.send({ message: "User", payload: userFromDb });
  }
});

//
//
//create-user
userApp.post("/createuser", async (request, response) => {
  //get userCollectionObject
  let userCollectionObject = request.app.get("userCollectionObject");

  //get user obj from client
  let userFromClient = request.body;
  //console.log(userFromClient);

  //search for existing user with given username
  let userFromDb = await userCollectionObject.findOne({
    username: userFromClient.username,
  });

  //if user already exist
  if (userFromDb !== null) {
    response.send({
      message: "Username already exists! Please choose another one.",
    });
  }

  //if user doesnot exist
  else {
    //hash the password
    let hashedPassword = await bcryptjs.hash(userFromClient.password, 6);
    //console.log(hashedPassword);

    //replace plain password with hashed password
    userFromClient.password = hashedPassword;

    //insert the new user
    await userCollectionObject.insertOne(userFromClient);
    //response message
    response.send({ message: "success" });
  }
});

//
//
//update-user
userApp.put("/updateuser", async (request, response) => {
  //get userCollectionObject
  let userCollectionObject = request.app.get("userCollectionObject");

  //get user object from client
  let modifiedUser = request.body;

  //update
  await userCollectionObject.updateOne(
    { username: modifiedUser.username },
    { $set: { ...modifiedUser } }
  );

  //send response
  response.send({ message: "User Modified", payload: modifiedUser });
});

//
//
//remove-user by username
userApp.delete("/removeuser/:username", async (request, response) => {
  //get userCollectionObject
  let userCollectionObject = request.app.get("userCollectionObject");

  let usernameToRemove = request.params.username;

  //find userObj with this username
  let userFromDb = await userCollectionObject.findOne({
    username: usernameToRemove,
  });

  //if user doesnot exist
  if (userFromDb != null) {
    await userCollectionObject.deleteOne(usernameToRemove);
    response.send({ message: "User Deleted" });
  }

  //if user exist
  else {
    response.send({
      message: "No such user Found",
    });
  }
});

//
//
//user login
userApp.post("/login", async (request, response) => {
  //user object
  let userCollectionObject = request.app.get("userCollectionObject");

  //get user credential
  let userCredObject = request.body;
  //console.log(userCredObject);

  //serach user by username
  let userFromDb = await userCollectionObject.findOne({
    username: userCredObject.username,
  });

  //if user exist or not
  if (userFromDb == null) {
    response.send({
      message: "Invalid username",
    });
  }
  //if user exist verify password
  else {
    let areEqual = await bcryptjs.compare(
      userCredObject.password,
      userFromDb.password
    );

    if (areEqual == false) {
      response.send({ message: "Invalid password" });
    } else {
      //response.send({ message: "Login Successful" });
      //create JWT
      let signedToken = jwt.sign(
        { username: userFromDb.username },
        process.env.SECRET,
        {
          expiresIn: 100,
        }
      );

      //send token in response
      response.send({
        message: "success",
        token: signedToken,
        user: userFromDb,
      });
    }
  }
});

//
//
//create middleware to verify token
const verifyToken = (request, response, next) => {
  //get token from header
  let token = request.headers.authorization;
  //console.log(token);
  //if token does not exist
  if (token == undefined) {
    response.send({ message: "Unathorized Request. Please Login." });
  } else {
    //verify the token
    try {
      jwt.verify(token, process.env.SECRET);
      //forward to next middleware
      next();
    } catch (err) {
      response.send({
        message: "Session Expired. Relogin to Continue.",
        payload: err,
      });
    }
  }
};

//
//
//private route
userApp.get("/privateroute", verifyToken, (request, response) => {
  response.send({ message: "This is a private message" });
});

//exporting user App
module.exports = userApp;
