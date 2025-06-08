import "dotenv/config";
import { mongoose } from "mongoose";
import { MONGO_URL, PORT } from "./src/config/config.js";
import app from "./app.js";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("💻 Mondodb Connected"))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Server Running at:${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log("ERROR:", err);
  process.exit(1);
});