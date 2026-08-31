import { Hono } from "hono";

import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

import { createMcpServer } from "./server.js";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    name: "sinc",
    status: "ok",
  });
});

app.all("/mcp", async (c) => {
  const server = createMcpServer();

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  await server.connect(transport);

  return transport.handleRequest(c.req.raw);
});

const port = Number(process.env.PORT ?? 4000);

console.log(`Sinc MCP running on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
