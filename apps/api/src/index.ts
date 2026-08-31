import { Hono } from "hono";

import agents from "./routes/agents";
import sessions from "./routes/sessions";
import events from "./routes/events";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    name: "sinc-api",
    status: "ok",
  });
});

app.route("/api/agents", agents);
app.route("/api/agents", sessions);
app.route("/api/sessions", events);

export default app;
