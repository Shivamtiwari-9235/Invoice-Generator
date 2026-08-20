const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
	sendEmailFromRequest,
} = require("../controllers/email.controller");


router.use(protect);


router.post("/send", sendEmailFromRequest);


module.exports = router;
