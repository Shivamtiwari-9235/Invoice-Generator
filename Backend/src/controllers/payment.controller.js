const Invoice = require("../models/Invoice");
const updateOverdueInvoices = require("../services/payment.service");


// MARK AS PAID

const markAsPaid = async (req, res) => {

    try {

        const invoice = await Invoice.findOne({

            _id: req.params.id,
            createdBy: req.user._id,

        });


        if (!invoice) {

            return res.status(404).json({

                message: "Invoice Not Found",

            });

        }


        invoice.paymentStatus = "Paid";

        await invoice.save();


        res.status(200).json({

            success: true,
            message: "Invoice marked as Paid.",
            invoice,

        });


    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};


// MARK AS PENDING

const markAsPending = async (req, res) => {

    try {

        const invoice = await Invoice.findOne({

            _id: req.params.id,
            createdBy: req.user._id,

        });


        if (!invoice) {

            return res.status(404).json({

                message: "Invoice Not Found",

            });

        }


        invoice.paymentStatus = "Pending";

        await invoice.save();


        res.status(200).json({

            success: true,
            message: "Invoice marked as Pending.",
            invoice,

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};




// GET PAID INVOICES

const getPaidInvoices = async (req, res) => {

    const invoices = await Invoice.find({

        createdBy: req.user._id,
        paymentStatus: "Paid",

    }).populate("client");


    res.status(200).json({

        success: true,
        invoices,

    });

};


// GET PENDING INVOICES

const getPendingInvoices = async (req, res) => {

    const invoices = await Invoice.find({

        createdBy: req.user._id,
        paymentStatus: "Pending",

    }).populate("client");


    res.status(200).json({

        success: true,
        invoices,

    });

};


// GET OVERDUE INVOICES

const getOverdueInvoices = async (req, res) => {

    await updateOverdueInvoices(Invoice);


    const invoices = await Invoice.find({

        createdBy: req.user._id,
        paymentStatus: "Overdue",

    }).populate("client");


    res.status(200).json({

        success: true,
        invoices,

    });

};


module.exports = {

    markAsPaid,
    markAsPending,
    getPaidInvoices,
    getPendingInvoices,
    getOverdueInvoices,

};