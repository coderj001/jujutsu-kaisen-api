import fastify from "fastify";
import { homeController } from "./src/home.controller";
import { charactersController } from "./src/characters/characters.controller";

async function bootstrap() {
  // Create Fastify app instance
  const app = fastify({ logger: true });

  // Docker health check
  app.get("/health", (_req, res) => {
    res.send("[+] Health check successful...");
  });

  app.register(homeController);
  app.register(charactersController, { prefix: 'api/v1/characters' });

  // Start the server
  const port = process.env.PORT ?? 3000;
  await app.listen({ port: +port });

  // Boilerplate for handling signals to gracefully shutdown a server
  ["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, async () => {
      await app.close();
      console.log("\n[+] Server Is Closed.");
      process.exit(0);
    });
  });
}

// Start the server
bootstrap();
