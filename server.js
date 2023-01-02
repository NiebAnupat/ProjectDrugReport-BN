import app from "./index";
import http from "http";
http.createServer(app).listen(process.env.PORT);
