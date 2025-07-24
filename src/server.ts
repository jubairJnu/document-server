import { Server } from "http";

import config from "./app/config";
import app from "./app";

const port = config.port;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log("server is listing on port", port);
  });
}

main().catch((err) => {
  console.error("❌ Server failed to start:", err);
});
