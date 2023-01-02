const app = require("./app");
const http = require("http");

if (typeof PhusionPassenger != "undefined") {
  PhusionPassenger.configure({ autoInstall: false });
}

// http.createServer(app).listen(process.env.PORT);
const server = http.createServer(app);

if (typeof PhusionPassenger != "undefined") {
  server.listen("passenger");
} else {
  server.listen(process.env.PORT);
}
