const express = require("express");
require("dotenv").config();
const usersRoutes = require("./routes/users.routes");
const mongo = require("./shared/mongo");
const jwt = require("jsonwebtoken");
const middleware = require("./shared/middleware");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
async function loadApp() {
  try {
    await mongo.connect();
    app.use(cors());
    app.use(express.json());
    app.use("/users", usersRoutes);

    app.use(middleware.authCheck);

    //Logging middleware
    app.use(middleware.loginMiddleware);

    app.listen(PORT, () => {
      console.log(`Server started At ${process.env.PORT}`);
    });
  } catch (err) {
    console.log("Error starting server", err);
  }
}

loadApp();
