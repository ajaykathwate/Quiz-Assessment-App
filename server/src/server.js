const http = require('http');

const app = require('./app');

const port = process.env.PORT || 3300;

const server = http.createServer(app);

server.listen(port, ()=>console.log("server running on http://localhost:3300/"));