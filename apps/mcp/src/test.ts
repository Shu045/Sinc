import { db } from "@repo/database";
console.log("DATABASE_URL at app/api start:", process.env.DATABASE_URL);

const workflow = await db.workflow.create({
  data: {
    name: "api",
    description: "new api design",
    userId: "fb0744a0-71ee-4906-a647-0b2f8b5124b3",
  },
});

console.log(workflow);
