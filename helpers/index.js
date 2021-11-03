const fs = require("fs");
const puppeteer = require("puppeteer");
const path = require("path");
const hbs = require("handlebars");

function generatePdf() {
  // generating pdf document
  const html = fs.readFileSync(path.join(__dirname, "../views/resume.hbs"), {
    encoding: "utf-8",
  });
  const template = hbs.compile(html);
  // rendered is the html content to be pushed in pdf
  const rendered = template();
  return rendered;
}

async function createPdf(pdfPath, htmlContent) {
  // open a new browser instance
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  // create a new page with the browser instance
  const page = await browser.newPage();

  await page.setContent(htmlContent);
  await page.emulateMediaType("screen");

  await page.pdf({
    path: path.join(__dirname, `../pdfFiles/${pdfPath}`),
    format: "A4",
    printBackground: true,
  });

  await browser.close();
}

async function getDownloadAbleFile() {
  const file = fs.readFileSync(
    path.join(__dirname, "../pdfFiles/Shrey_Patel_Resume.pdf")
  );
  const stat = fs.statSync(
    path.join(__dirname, "../pdfFiles/Shrey_Patel_Resume.pdf")
  );
  return { file, stat };
}

module.exports = {
  createPdf,
  getDownloadAbleFile,
  generatePdf,
};
