const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PW);

mongoose
  .connect(db)
  .then((con) => {
    console.log("MongoDB connection successful.");
  })
  .catch((err) => {
    console.log("This error occured->", err);
  });

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNCAUGHT PROMISE REJECTION->", err);
  server.close(() => {
    process.exit(1);
  });
});
