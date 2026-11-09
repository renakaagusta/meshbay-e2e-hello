const http = require("http");
const port = Number(process.env.PORT || 3000);
http.createServer((request, response) => {
  response.writeHead(200, { "content-type": "text/html" });
  response.end(`<!doctype html><title>meshbay e2e</title><h1>hello from meshbay e2e v6 node-autodetect port=${port}</h1>`);
}).listen(port, "0.0.0.0", () => console.log(`listening on ${port}`));
