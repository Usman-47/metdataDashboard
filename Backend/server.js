require("dotenv").config();
var cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const metadataRouter = require("./routes/metadata");

const port = process.env.PORT || 5000;
const version1 = "/api/v1";

//db connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connection to the database is successful"));
app.use(express.json());

const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
//The API routes
app.use(`${version1}/metadata`, metadataRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
