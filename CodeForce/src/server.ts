import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const app = new Hono();

const transports = new Map<string, StreamableHTTPServerTransport>();

function createMcpServer() {
  const server = new McpServer({
    name: "notification-mcp",
    version: "1.0.0",
  });

  server.registerTool(
    "send_notification",
    {
      description:
        "Send a push notification to the user when an important task is completed.",

      inputSchema: {
        title: z.string(),
        body: z.string(),
      },
    },

    async ({ title, body }) => {
      console.log("Sending notification:", {
        title,
        body,
      });

      // TODO:
      // Call your notification service here.
      //
      // await notificationService.send({
      //   title,
      //   body,
      // });
      console.log("Sending notification");

      return {
        content: [
          {
            type: "text",
            text: `Notification sent: ${title}`,
          },
        ],
      };
    },
  );

  return server;
}

/*
 * Health check
 */
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    service: "notification-mcp",
  });
});

/*
 * MCP endpoint
 */
app.all("/mcp", async (c) => {
  const req = c.req.raw;

  /*
   * Existing MCP session
   */
  const sessionId = req.headers.get("mcp-session-id");

  if (sessionId) {
    const transport = transports.get(sessionId);

    if (!transport) {
      return c.text("Session not found", 404);
    }

    return transport.handleRequest(req);
  }

  /*
   * New MCP session
   */
  if (req.method === "POST") {
    const body = await req
      .clone()
      .json()
      .catch(() => null);

    if (isInitializeRequest(body)) {
      const server = createMcpServer();

      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => crypto.randomUUID(),

        onsessioninitialized: (sessionId) => {
          transports.set(sessionId, transport);

          console.log(`MCP session started: ${sessionId}`);
        },
      });

      transport.onclose = () => {
        const sessionId = transport.sessionId;

        if (sessionId) {
          transports.delete(sessionId);

          console.log(`MCP session closed: ${sessionId}`);
        }
      };

      await server.connect(transport);

      return transport.handleRequest(req);
    }
  }

  return c.text("Bad MCP request", 400);
});

/*
 * Start server
 */

const port = Number(process.env.PORT) || 3000;

serve({
  fetch: app.fetch,
  port,
  hostname: "0.0.0.0",
});

console.log(`🚀 MCP server running on port ${port}`);
