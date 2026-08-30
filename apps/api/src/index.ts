import { Hono } from "hono";
const router = new Hono();
// router.on(["POST", "GET"], "/api/auth/*", (c) => Auth.handler(c.req.raw));
export default router;
