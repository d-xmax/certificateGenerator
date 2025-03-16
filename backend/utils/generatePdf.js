const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const createPDF = (name, dob, dod) => {
  return new Promise((resolve, reject) => {
    const pdfPath = path.join(
      __dirname,
      `../certificates/${name}.pdf`
    );

    const certificateDir = path.join(
      __dirname,
      '../certificates'
    );
    if (!fs.existsSync(certificateDir)) {
      fs.mkdirSync(certificateDir);
    }
    const doc = new PDFDocument({ size: 'A4' });
    const stream = fs.createWriteStream(pdfPath);

    stream.on('finish', () => {
      // console.log('certificate util generated');

      resolve(pdfPath);
    });

    stream.on('error', (err) => {
      // console.log('certificate util error occurred')
      reject(err);
    });

    doc.pipe(stream);
    doc
      .fontSize(25)
      .text('Certificate of Completion', {
        align: 'center',
      });
    doc.moveDown();
    doc
      .fontSize(20)
      .text(`Name of the person ${name}`, {
        align: 'center',
      });
    doc.moveDown();
    doc
      .fontSize(20)
      .text(`The date of the birth ${dob}`, {
        align: 'center',
      });
    doc.moveDown();
    doc
      .fontSize(20)
      .text(`The data of the death ${dod}`, {
        align: 'center',
      });
    doc.moveDown();
    doc
      .fontSize(20)
      .text(`Rest in pease ${name}`);

    doc.end();
  });
};

module.exports = { createPDF };
