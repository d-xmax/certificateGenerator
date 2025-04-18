const express = require('express');
const router = express.Router();
const {
  generateCertificate,
  generateTemplates,
} = require('../controller/certificateController.js');
const multer = require('multer');

// handle file upload
const upload = multer({dest: 'uploads/'})


// certificate generate
router.post(
  '/certificate/generate',
  upload.single("image"),
  generateCertificate
);
// certificate template
router.get('/templates', generateTemplates);

module.exports = router;
