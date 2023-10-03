import { FastifyInstance } from "fastify";

export function homeController(
    app: FastifyInstance,
    opts: any,
    done: () => void,
): void {
    app.get("/", (_, reply) => {
        reply.redirect(303, "/health");
    });
    done();
}
