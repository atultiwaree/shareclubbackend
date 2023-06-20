const express = require("express");
const app = express();
const http = require("http");
const morgan = require("morgan");
const server = http.createServer(app);
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

require("dotenv").config();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const indexRoute = require("./routes/index.routes");

// app.get("/", (req, res) => res.status(200).json({ status: "Working fine!" }));

app.use("/api/v1", indexRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✔ MongoDb : START"))
  .catch((error) => console.log("MNG CNN ERR", error));
server.listen(PORT, (err) => (!err ? console.log(`✔ Node Listening to http://localhost:${PORT}`) : console.log("There was some error ", err.message)));
