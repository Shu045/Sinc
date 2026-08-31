import { Hono } from "hono";
import workflows from "./routes/workflows";
import runs from "./routes/run";

const app = new Hono();

app.get("/health", async (c) => {
  return c.json({
    status: "ok",
  });
});

app.route("/api/workflows", workflows);
app.route("/api/runs", runs);

export default app;
