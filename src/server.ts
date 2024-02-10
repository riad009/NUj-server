import { Server } from "http";
import app from "./app";
import config from "./app/config";

let server: Server;
async function main() {
  server = app.listen(config.port, () => {
    console.log(`server running on ${config.port}`);
  });
}

main();
