const Invoice = require("../models/Invoice");
const Client = require("../models/client");
const generateInvoiceNumber = require("../utils/invoiceNumberGenerator");
const calculateGST = require("../services/gst.service");
const generatePDF = require("../services/pdf.service");


// CREATE INVOICE

const createInvoice = async (req, res) => {
  try {
    const {
      client,
      serviceDescription,
      amount,
      gstPercentage,
      dueDate,
      notes,
    } = req.body;

    const numericAmount = Number(amount);
    const numericGstPercentage = Number(gstPercentage ?? 0);
    const parsedDueDate = new Date(dueDate);

    if (!client || !serviceDescription || !Number.isFinite(numericAmount) || !Number.isFinite(numericGstPercentage) || !dueDate) {
      return res.status(400).json({
        message: "client, serviceDescription, amount, gstPercentage, and dueDate are required",
      });
    }

    if (Number.isNaN(parsedDueDate.getTime())) {
      return res.status(400).json({
        message: "A valid dueDate is required",
      });
    }

    // Check client exists

    const existingClient = await Client.findOne({
      _id: client,
      createdBy: req.user._id,
    });

    if (!existingClient) {
      return res.status(404).json({
        message: "Client Not Found",
      });
    }

    // GST Calculation

    const { gstAmount, totalAmount } = calculateGST(numericAmount, numericGstPercentage);

    let invoice = null;

    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        invoice = await Invoice.create({
          invoiceNumber: generateInvoiceNumber(),
          client: existingClient._id,
          serviceDescription,
          amount: numericAmount,
          gstPercentage: numericGstPercentage,
          gstAmount,
          totalAmount,
          dueDate: parsedDueDate,
          notes,
          createdBy: req.user._id,
        });
        break;
      } catch (createError) {
        if (createError?.code !== 11000 || attempt === 2) {
          throw createError;
        }
      }
    }

    res.status(201).json({
      success: true,
      message: "Invoice Created Successfully",
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL INVOICES

const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      createdBy: req.user._id,
    }).populate("client");

    res.status(200).json({
      success: true,
      totalInvoices: invoices.length,
      invoices,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE INVOICE

const getSingleInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    }).populate("client");

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice Not Found",
      });
    }

    res.status(200).json({
      success: true,
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE INVOICE

const updateInvoice = async (req, res) => {
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

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Invoice Updated Successfully",
      updatedInvoice,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE INVOICE

const deleteInvoice = async (req, res) => {
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

    await invoice.deleteOne();

    res.status(200).json({
      success: true,
      message: "Invoice Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createInvoice,
  getAllInvoices,
  getSingleInvoice,
  updateInvoice,
  deleteInvoice,
  downloadInvoicePDF,
};


// DOWNLOAD INVOICE PDF

async function downloadInvoicePDF(req, res) {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    }).populate("client");

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice Not Found",
      });
    }

    const filePath = await generatePDF(invoice);

    return res.download(filePath, `${invoice.invoiceNumber}.pdf`);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}