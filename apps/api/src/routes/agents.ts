import { Hono } from "hono";
import { db } from "@repo/database";

const agents = new Hono();

agents.post("/", async (c) => {
  const body = await c.req.json();

  const agent = await db.agent.create({
    data: {
      name: body.name ?? "My Agent",
    },
  });

  return c.json(agent, 201);
});

agents.get("/", async (c) => {
  const agents = await db.agent.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return c.json(agents);
});

export default agents;
