const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const {

    markAsPaid,
    markAsPending,
    getPaidInvoices,
    getPendingInvoices,
    getOverdueInvoices,

} = require("../controllers/payment.controller");


router.use(protect);


router.put(
    "/paid/:id",
    markAsPaid
);


router.put(
    "/pending/:id",
    markAsPending
);


router.get(
    "/paid",
    getPaidInvoices
);


router.get(
    "/pending",
    getPendingInvoices
);


router.get(
    "/overdue",
    getOverdueInvoices
);


module.exports = router;