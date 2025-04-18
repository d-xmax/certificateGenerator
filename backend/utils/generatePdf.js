const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const templatePositions = require('./templatePositions');
const htmlParser = require('htmlparser2');
const {
  createCanvas,
  loadImage,
} = require('canvas');
// const { width, height } = require('pdfkit/js/page');


const createPDF = (
  name,
  dob,
  dod,
  template,
  image,
  otherDetails
) => {
  const [dobYear, dobMonth, dobDay] =
    dob.split('-');
  const [dodYear, dodMonth, dodDay] =
    dod.split('-');

  const dobParts = {
    year: dobYear,
    month: dobMonth,
    day: dobDay,
  };

  const dodParts = {
    year: dodYear,
    month: dodMonth,
    day: dodDay,
  };
  return new Promise(async (resolve, reject) => {
    const templateData =
      templatePositions[template];
    if (!templateData) {
      return reject(
        new Error('Invalid template name')
      );
    }
    const pageWidth = 595;
    const pageHeight = 842;
    const templatePath = path.join(
      __dirname,
      '../templates',
      template
    );

    const backgroundImage = await loadImage(
      templatePath
    );

    const canvas = createCanvas(
      pageWidth,
      pageHeight
    );

    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      backgroundImage,
      0,
      0,
      pageWidth,
      pageHeight
    );

    ctx.font = ' 32px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(
      name,
      templateData.name.x,
      templateData.name.y
    );

    // dob positioning
    Object.entries(dobParts).forEach(
      ([key, value]) => {
        const { x, y } = templateData.dob[key];
        ctx.fillText(value, x, y);
      }
    );
    // dod positioning
    Object.entries(dodParts).forEach(
      ([key, value]) => {
        const { x, y } = templateData.dod[key];

        ctx.fillText(value, x, y);
      }
    );
    const parser = new htmlParser.Parser(otherDetails)
    const userImage = await loadImage(image.path);

    const { x, y, width, height } =
      templateData.image;

    const imageWidth = userImage.width;
    const imageHeight = userImage.height;

    ctx.imageSmoothingEnabled = true;

    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.clip();

    const aspectRatio = Math.max(
      width / imageWidth,
      height / imageHeight
    );
    const newWidth = imageWidth * aspectRatio;
    const newHeight = imageHeight * aspectRatio;

    const centerX = x + (width - newWidth) / 2;
    const centerY = y + (height - newHeight) / 2;

    ctx.drawImage(
      userImage,
      centerX,
      centerY,
      newWidth,
      newHeight
    );

    ctx.restore();

    const finalImage = canvas.toBuffer(
      'image/png',
      { compressionLevel: 0 }
    );
    const certificateDir = path.join(
      __dirname,
      '../certificates'
    );
    const certificate = path.join(
      __dirname,
      '../certificates',
      `${name}.pdf`
    );

    if (!fs.existsSync(certificateDir)) {
      fs.mkdirSync(certificateDir);
    }

    const doc = new PDFDocument({
      size: 'A4',
    });
    const stream =
      fs.createWriteStream(certificate);

    doc.image(finalImage, 0, 0, {
      width: pageWidth,
      height: pageHeight,
    });
    doc.text(otherDetails, 200, 400);

    doc.pipe(stream);
    doc.end();
  });
};

module.exports = { createPDF };
