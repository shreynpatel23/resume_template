const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const expressHbs = require("express-handlebars");
const dotenv = require("dotenv");
const { generatePdf, getDownloadAbleFile, createPdf } = require("./helpers");
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

app.post("/downloadResume", async (_, res) => {
  // use this function to generate the pdf and render the html content
  const htmlContent = await generatePdf();

  // creating the pdf
  await createPdf("Shrey_Patel_Resume.pdf", htmlContent);

  // get the downloadable link and send it as a response
  const { file, stat } = await getDownloadAbleFile();
  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=Shrey_Patel_Resume.pdf"
  );

  res.send(file);
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
