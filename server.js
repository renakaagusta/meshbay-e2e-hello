const http = require("http");

const port = Number(process.env.PORT || 3000);

function environmentEcho(key) {
  if (!key.startsWith("E2E_")) return null;
  const value = process.env[key];
  if (value === undefined) return null;
  return JSON.stringify({ key, value });
}

http
  .createServer((request, response) => {
    const matched = /^\/env\/([A-Za-z0-9_]+)$/.exec(request.url);
    if (matched) {
      const echo = environmentEcho(matched[1]);
      if (echo === null) {
        response.writeHead(404, { "content-type": "application/json" });
        response.end(JSON.stringify({ error: "only E2E_ keys are echoed" }));
        return;
      }
      response.writeHead(200, { "content-type": "application/json" });
      response.end(echo);
      return;
    }
    response.writeHead(200, { "content-type": "text/html" });
    response.end(
      `<!doctype html><title>meshbay e2e</title><h1>hello from meshbay e2e v8 node-owner port=${port}</h1>`,
    );
  })
  .listen(port, "0.0.0.0", () => console.log(`listening on ${port}`));
