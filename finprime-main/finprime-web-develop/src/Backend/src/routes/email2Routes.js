const express = require("express");
const email2Controller = require("../controllers/email2Controller");
const router = express.Router();


router.post('/send2email', email2Controller.sendEmail);


router.get('/subscribers', email2Controller.getMails);

module.exports = router;
