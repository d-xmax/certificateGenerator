const express = require('express');
const router = express.Router();
const {
  generateCertificate,
  generateTemplates,
} = require('../controller/certificateController.js');

// certificate generate
router.post(
  '/certificate/generate',
  generateCertificate
);
// certificate template
router.get('/templates', generateTemplates);

module.exports = router;
