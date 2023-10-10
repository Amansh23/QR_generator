var express = require('express');
var router = express.Router();
const util = require('util');

// Require the package
const QRCode = require('qrcode')
 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Promisify the QRCode.toDataURL function
const toDataURL = util.promisify(QRCode.toDataURL);



router.post('/qrGenerator', async function(req, res) {
  try {

    // Generate the QR code as a Data URL using Promisify
    const codeDataUrl = await toDataURL(req.body.text)
    res.render('qrpage', {
      qrCodeImageData: codeDataUrl,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});


module.exports = router;
