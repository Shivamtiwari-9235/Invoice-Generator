const mongoose = require("mongoose");

const Invoice = require("../models/Invoice");
const sendPaymentReminder = require("../services/reminder.service");

const sendReminder = async (req, res) => {
    try {
        const invoiceId = req.params.id || req.body.invoiceId || req.body.id;

        if (!invoiceId || !mongoose.Types.ObjectId.isValid(invoiceId)) {
            return res.status(400).json({
                message: "Valid invoice id is required",
            });
        }

        const invoice = await Invoice.findOne({
            _id: invoiceId,
            createdBy: req.user._id,
        }).populate("client");

        if (!invoice) {
            return res.status(404).json({
                message: "Invoice Not Found",
            });
        }

        if (!invoice.client || !invoice.client.email) {
            return res.status(400).json({
                message: "Invoice client email is missing",
            });
        }

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn(
                "[reminder.controller] Email service is not configured. Using development fallback for reminder email."
            );
        }

        await sendPaymentReminder(invoice.client.email, invoice);

        res.status(200).json({
            success: true,
            message: "Reminder Sent Successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    sendReminder,
};