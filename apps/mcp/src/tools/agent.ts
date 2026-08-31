import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

const AGENT_ID = process.env.AGENT_ID || "cmtgyfwdp0000vbex0ix449hj";

if (!AGENT_ID) {
  throw new Error("AGENT_ID environment variable is required");
}

async function createEvent(sessionId: string, type: string, data: unknown) {
  const response = await fetch(`${API_URL}/api/sessions/${sessionId}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type,
      data,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create event: ${response.status} ${await response.text()}`,
    );
  }

  return response.json();
}

async function createSession() {
  const response = await fetch(`${API_URL}/api/agents/${AGENT_ID}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create session: ${response.status} ${await response.text()}`,
    );
  }

  return response.json();
}

export function registerAgentTools(server: McpServer) {
  server.registerTool(
    "start_session",
    {
      description:
        "Start a new Sinc agent session. Use this when beginning work so the user's phone can observe the agent.",
      inputSchema: {},
    },
    async () => {
      try {
        const session = await createSession();

        return {
          content: [
            {
              type: "text",
              text: `Sinc session started. Session ID: ${session.id}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text:
                error instanceof Error
                  ? error.message
                  : "Failed to start Sinc session",
            },
          ],
          isError: true,
        };
      }
    },
  );

  server.registerTool(
    "notify_user",
    {
      description:
        "Send a message about what you are doing to the user's Sinc phone app. Use this when you want the user to know what is happening on their computer.",
      inputSchema: {
        sessionId: z.string().describe("The current Sinc session ID"),
        message: z.string().min(1).describe("The message to show the user"),
      },
    },
    async ({ sessionId, message }) => {
      try {
        await createEvent(sessionId, "MESSAGE", {
          text: message,
        });

        return {
          content: [
            {
              type: "text",
              text: "Message sent to the user's Sinc app.",
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text:
                error instanceof Error
                  ? error.message
                  : "Failed to notify user",
            },
          ],
          isError: true,
        };
      }
    },
  );

  server.registerTool(
    "report_tool_call",
    {
      description:
        "Tell Sinc that you are about to use a tool. This allows the phone to display what the AI is doing.",
      inputSchema: {
        sessionId: z.string(),
        tool: z.string(),
        arguments: z.record(z.unknown()).optional(),
      },
    },
    async ({ sessionId, tool, arguments: args }) => {
      try {
        await createEvent(sessionId, "TOOL_CALL", {
          tool,
          arguments: args ?? {},
        });

        return {
          content: [
            {
              type: "text",
              text: "Tool activity reported to Sinc.",
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text:
                error instanceof Error
                  ? error.message
                  : "Failed to report tool call",
            },
          ],
          isError: true,
        };
      }
    },
  );
}
