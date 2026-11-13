
import express, { type Express } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Ultraviolet runtime files and browser transports.
app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));

// Serve the Vite production build.
const webRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../cocox-home/dist/public",
);

app.use((req, res, next) => {
  if (
    req.method === "GET" &&
    !req.path.startsWith("/api/") &&
    !req.path.startsWith("/wisp/")
  ) {
    res.sendFile(path.join(webRoot, "index.html"), (error) => {
      if (error) next(error);
    });
    return;
  }

  next();
});

export default app;
