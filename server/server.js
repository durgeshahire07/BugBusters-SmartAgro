const http = require("http");
const app = require("./app");

const port = process.env.PORT || 3100;

const server = http.createServer(app);

server.listen(port,console.log(`Server started at port ${port}\nBrowse at http://localhost:${port}/api/v1/`));
