const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const expressHbs = require("express-handlebars");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.engine(
  "hbs",
  expressHbs({
    layoutsDir: __dirname + "/views",
  })
);
app.set("view engine", "hbs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.sendFile("index.html");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
