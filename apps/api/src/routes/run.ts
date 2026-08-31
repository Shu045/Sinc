import { Hono } from "hono";
import { db } from "@repo/database";

const runs = new Hono();

runs.get("/:workflowId", async (c) => {
  const workflowId = c.req.param("workflowId");

  const data = await db.workflowRun.findMany({
    where: { workflowId },
    orderBy: {
      createdAt: "desc",
    },
  });

  return c.json(data);
});

runs.post("/:workflowId", async (c) => {
  const workflowId = c.req.param("workflowId");
  const body = await c.req.json();

  const run = await db.workflowRun.create({
    data: {
      workflowId,
      input: body.input,
      status: "PENDING",
    },
  });

  return c.json(run, 201);
});

runs.get("/:workflowId/:runId", async (c) => {
  const workflowId = c.req.param("workflowId");
  const runId = c.req.param("runId");

  const run = await db.workflowRun.findFirst({
    where: {
      id: runId,
      workflowId,
    },
  });

  if (!run) {
    return c.json({ error: "Run not found" }, 404);
  }

  return c.json(run);
});

export default runs;
