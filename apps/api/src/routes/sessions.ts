import { db } from "@repo/database";
import { Hono } from "hono";

const sessions = new Hono();

sessions.post("/:agentId/sessions", async (c) => {
  const agentId = c.req.param("agentId");

  const agent = await db.agent.findUnique({
    where: {
      id: agentId,
    },
  });

  if (!agent) {
    return c.json(
      {
        error: "Agent not found",
      },
      404,
    );
  }

  const session = await db.agentSession.create({
    data: {
      agentId,
    },
  });

  return c.json(session, 201);
});

sessions.get("/:agentId/sessions", async (c) => {
  const agentId = c.req.param("agentId");

  const sessions = await db.agentSession.findMany({
    where: {
      agentId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return c.json(sessions);
});

export default sessions;
