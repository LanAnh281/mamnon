const app = require("./app");
const { config, mongoose } = require("./app/config/index");

// start server
const PORT = config.app.port;
mongoose.connect(config.db.uri).then(() => console.log("Connected mammon!"));
