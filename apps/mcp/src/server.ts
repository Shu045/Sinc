import { config } from "dotenv";
config({ path: "../../.env" });
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { db } from "@repo/database";
import { z } from "zod";

export function createMcpServer() {
  const server = new McpServer({
    name: "sinc-workflows",
    version: "1.0.0",
  });

  registerWorkflowTools(server);

  return server;
}

function registerWorkflowTools(server: McpServer) {
  const user_id = "fb0744a0-71ee-4906-a647-0b2f8b5124b3";
  server.registerTool(
    "list_workflows",
    {
      title: "List Workflows",
      description: "List the workflows belonging to the current user.",
      inputSchema: {},
    },
    async () => {
      try {
        const data = await db.workflow.findMany({
          where: { userId: user_id },
          include: {
            steps: {
              orderBy: { order: "asc" },
            },
          },
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(error, null, 2),
            },
          ],
        };
      }
    },
  );
  server.registerTool(
    "create_workflow",
    {
      title: "Create Workflow",
      description: "Create a new AI workflow.",
      inputSchema: {
        name: z.string().min(1).describe("Workflow name"),
        description: z
          .string()
          .optional()
          .describe("Optional workflow description"),
      },
    },
    async ({ name, description }) => {
      try {
        console.log("NEW REQ  name : ", name, "desc : ", description);
        const workflow = await db.workflow.create({
          data: {
            name,
            description,
            userId: user_id,
          },
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(workflow, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to create workflow: ${error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
