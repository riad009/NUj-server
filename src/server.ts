import { Server } from "http";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

let server: Server;
async function main() {
  server = app.listen(config.port, () => {
    console.log(`server running on ${config.port}`);
  });

  await mongoose.connect(config.db_url as string);
  console.log(`DB is connected`);
}

main();
