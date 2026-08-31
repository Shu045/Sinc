import { db } from "./client";

const workflow = await db.agent.create({
  data: {
    name: "opencode",
  },
});

console.log(workflow);
