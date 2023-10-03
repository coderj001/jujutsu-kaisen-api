import fastify from "fastify";

async function bootstrap() {
  // Create Fastify app instance
  const app = fastify({ logger: true });

  // Docker health check
  app.get("/health", (req, res) => {
    res.send("[+] Health check successful...");
  });

  // Start the server
  const port = process.env.PORT ?? 3000;
  await app.listen({ port: +port });

  // Boilerplate for handling signals to gracefully shutdown a server
  ["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, async () => {
      await app.close();
      process.exit(0);
    });
  });
}

// Start the server
bootstrap();
