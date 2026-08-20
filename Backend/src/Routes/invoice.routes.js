const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createInvoice,
  getAllInvoices,
  getSingleInvoice,
  updateInvoice,
  deleteInvoice,
  downloadInvoicePDF,
} = require("../controllers/invoice.controller");

router.use(protect);
router.post("/create", createInvoice);

router.get("/", getAllInvoices);

router.get("/download-pdf/:id", downloadInvoicePDF);

router.get("/:id", getSingleInvoice);

router.put("/:id", updateInvoice);

router.delete("/:id", deleteInvoice);


module.exports = router;