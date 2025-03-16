const {
  createPDF,
} = require('../utils/generatePdf');
const fs = require('fs');
const mime = require('mime-types')
const path = require('path');
const generateCertificate = (req, res) => {
  const { name, dob, dod } = req.body;
  if (!name || !dob || !dod) {
    return res
      .status(400)
      .json({ err: 'Incomplete data' });
  }
  const pdfPath = createPDF(name, dob, dod);

  pdfPath
    .then(() => {
      res.status(200).json({
        message:
          'Certificate generation successful',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        err: 'Certificate generation failed',
      });
    });
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
    const pngTemplates = files.filter((file) =>{
      const mimeType = mime.lookup(file)
      return mimeType && mimeType.startsWith('image/')
     }
    );

    res.json(pngTemplates);
    console.log(pngTemplates);
  });
};

module.exports = {
  generateCertificate,
  generateTemplates,
};
