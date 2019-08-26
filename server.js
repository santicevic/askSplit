const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");
const path = require("path");

const app = express();

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
