import { Hono } from "hono";

import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

import { createMcpServer } from "./server.js";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    name: "sinc-workflows",
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

export default {
  port: 4000,
  fetch: app.fetch,
};
