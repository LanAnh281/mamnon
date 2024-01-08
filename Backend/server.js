const app = require("./app");
const {
    config,
    connection,
    sequelize,
    createTable,
} = require("./app/config/index");
// connect to the database
connection();// start server
const PORT = config.app.port;

