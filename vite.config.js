import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function vercelApiDevPlugin() {
  return {
    name: "vercel-api-dev",
    configureServer(server) {
      server.middlewares.use("/api/markets", async (req, res) => {
        if (req.method !== "GET") {
          res.statusCode = 405;
          res.setHeader("Allow", "GET");
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        try {
          const { default: handler } = await import("./api/markets.js");
          await handler(req, {
            setHeader: (...args) => res.setHeader(...args),
            status(statusCode) {
              res.statusCode = statusCode;
              return {
                json(payload) {
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify(payload));
                }
              };
            }
          });
        } catch (error) {
          console.error("Local API route failed:", error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Local API route failed" }));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), vercelApiDevPlugin()]
});
