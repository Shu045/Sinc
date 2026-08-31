import { Hono } from "hono";
import { db } from "../database/db";

const userRoutes = new Hono();

userRoutes.get("/health", async (c) => {
  return c.json({
    message: "user route working",
  });
});

userRoutes.post("/new", async (c) => {
  try {
    const { email, password }: { email: string; password: string } =
      await c.req.json();
    const result = await db.user.create({
      data: {
        email,
        password,
      },
    });

    console.log(result);
    return c.json({
      error: result.id,
    });
  } catch (error) {
    return c.json({
      error: error,
    });
  }
});

export default userRoutes;
