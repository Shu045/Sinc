import { Hono } from "hono";
import { db } from "@repo/database";

const workflows = new Hono();

workflows.get("/", async (c) => {
  const userId = "user-id";

  const data = await db.workflow.findMany({
    where: { userId },
    include: {
      steps: {
        orderBy: { order: "asc" },
      },
    },
  });

  return c.json(data);
});

workflows.post("/", async (c) => {
  const body = await c.req.json();

  const workflow = await db.workflow.create({
    data: {
      name: body.name,
      description: body.description,
      userId: "user-id",
    },
  });

  return c.json(workflow, 201);
});

workflows.get("/:id", async (c) => {
  const id = c.req.param("id");

  const workflow = await db.workflow.findUnique({
    where: { id },
    include: {
      steps: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!workflow) {
    return c.json({ error: "Workflow not found" }, 404);
  }

  return c.json(workflow);
});

workflows.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  const workflow = await db.workflow.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description,
      enabled: body.enabled,
    },
  });

  return c.json(workflow);
});

workflows.delete("/:id", async (c) => {
  const id = c.req.param("id");

  await db.workflow.delete({
    where: { id },
  });

  return c.json({ success: true });
});

export default workflows;
