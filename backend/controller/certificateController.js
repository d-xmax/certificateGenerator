const { error } = require('console');
const {
  createPDF,
} = require('../utils/generatePdf');
const fs = require('fs');
const mime = require('mime-types');
const path = require('path');
const generateCertificate = (req, res) => {
  const { name, dob, dod, template, otherDetails } = req.body;
  const image = req.file;

  if (
    !name ||
    !dob ||
    !dod ||
    !template ||
    !image||
    !otherDetails
  ) {
    return res.status(400).json({
      error: 'Missing your required Files.',
    });
  }
console.log(otherDetails)
  const pdfPath = createPDF(
    name,
    dob,
    dod,
    template,
    image,
    otherDetails
  );
  pdfPath
    .then((res) => {})
    .catch((err) => console.log(err))

    // pdfPath
    //   .then(() => {
    //     res.status(200).json({
    //       message:
    //         'Certificate generation successful',
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.status(500).json({
    //       err: 'Certificate generation failed',
    //     });
    //   });

    .catch((err) => console.log(err));
};
// Get templates
const generateTemplates = (req, res) => {
  const templatesDir = path.join(
    __dirname,
    '../templates'
  );

  console.log(templatesDir);
  fs.readdir(templatesDir, (err, files) => {
    if (err) {
      return res.status(500).json({
        error: 'Error occurred in file reading',
      });
    }
    const pngTemplates = files.filter((file) => {
      const mimeType = mime.lookup(file);
      return (
        mimeType && mimeType.startsWith('image/')
      );
    });

    res.json(pngTemplates);
    console.log(pngTemplates);
  });
};

module.exports = {
  generateCertificate,
  generateTemplates,
};
