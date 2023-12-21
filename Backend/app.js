// npm packages
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// initialize
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

const http = require("http");
const server = http.createServer(app);
//route

const roleRouter = require("./app/route/role.route");
app.use("/static", express.static(path.join(__dirname, "static")));
server.listen(3000, () => {
  console.log(`Server is listening on port`);
});

// simple route
app.get("/", (req, res, next) => {
  return res.send({
    message: "Welcome to Personal Cosmetic System",
  });
});

// handles before https methods
const convertToLowercase = (req, res, next) => {
  for (let key in req.body) {
    if (typeof req.body[key] === "string") {
      req.body[key] = req.body[key].toLowerCase();
    }
  }
  next();
};

app.use(convertToLowercase);
//

app.use("/api/role", roleRouter);
// // check errors
app.use((req, res, next) => {
  return next(createError(404, "Resource Not Found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// exports
module.exports = app;
