const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
	generateInvoiceData,
} = require("../controllers/ai.controller");


router.use(protect);


router.post("/generate-invoice-data", generateInvoiceData);


module.exports = router;
