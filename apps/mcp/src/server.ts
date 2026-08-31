import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAgentTools } from "./tools/agent.js";

export function createMcpServer() {
  const server = new McpServer({
    name: "sinc",
    version: "0.1.0",
  });

  registerAgentTools(server);

  return server;
}
