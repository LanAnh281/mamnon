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
const accountRouter = require("./app/route/account.route");
const roleRouter = require("./app/route/role.route");
const permissionRouter = require("./app/route/permission.route");
const rolePermissionRouter = require("./app/route/rolePermission.route");

const schoolRouter = require("./app/route/school.route");
const schoolMediaRouter = require("./app/route/schoolMedia.route");

const categoriesRoute = require("./app/route/categories.route");
const foodListRoute = require("./app/route/foodList.route");
const menuDailyRoute = require("./app/route/menuDaily.route");
const gradeRoute = require("./app/route/grade.route");
const courseRoute = require("./app/route/course.route");
const classRoomRoute = require("./app/route/classroom.route");
const programsRoute = require("./app/route/program.route");
const userRoute = require("./app/route/user.route");
const loginRoute = require("./app/route/login.route");
// API
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
//router
app.use("/api/accounts", accountRouter);
app.use("/api/role", roleRouter);
app.use("/api/permission", permissionRouter);
app.use("/api/rolePermission", rolePermissionRouter);
app.use("/api/school", schoolRouter);
app.use("/api/schoolMedia", schoolMediaRouter);
app.use("/api/categories", categoriesRoute);
app.use("/api/foodList", foodListRoute);
app.use("/api/menuDaily", menuDailyRoute);
app.use("/api/grade", gradeRoute);
app.use("/api/course", courseRoute);
app.use("/api/class", classRoomRoute);
app.use("/api/program", programsRoute);
app.use("/api/user", userRoute);
app.use("/api/login", loginRoute);
// API
// check errors
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
