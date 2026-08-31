import { Hono } from "hono";
import { db } from "@repo/database";

const events = new Hono();

events.get("/:sessionId/events", async (c) => {
  const sessionId = c.req.param("sessionId");

  const events = await db.agentEvent.findMany({
    where: {
      sessionId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return c.json(events);
});

events.post("/:sessionId/events", async (c) => {
  const sessionId = c.req.param("sessionId");

  const body = await c.req.json();

  const session = await db.agentSession.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (!session) {
    return c.json(
      {
        error: "Session not found",
      },
      404,
    );
  }

  const event = await db.agentEvent.create({
    data: {
      sessionId,
      type: body.type,
      data: body.data,
    },
  });

  return c.json(event, 201);
});

export default events;
