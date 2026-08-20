const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const formatDate = require("../utils/FormatDate");

const generatePDF = (invoice) => {

    const invoicesDir = path.join(__dirname, "../../generatedInvoices");

    // Create folder if not exists
    if (!fs.existsSync(invoicesDir)) {
        fs.mkdirSync(invoicesDir, { recursive: true });
    }

    const fileName = `${invoice.invoiceNumber}.pdf`;

    const filePath = path.join(invoicesDir, fileName);

    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    // Heading
    doc.fontSize(24).text("Invoice", {
        align: "center",
    });

    doc.moveDown();

    // Invoice Details
    doc.fontSize(12).text(`Invoice Number : ${invoice.invoiceNumber}`);
    doc.text(`Client Name : ${invoice.client.clientName}`);
    doc.text(`Client Email : ${invoice.client.email}`);
    doc.text(`Service : ${invoice.serviceDescription}`);
    doc.text(`Amount : ₹${invoice.amount}`);
    doc.text(`GST (%) : ${invoice.gstPercentage}`);
    doc.text(`GST Amount : ₹${invoice.gstAmount}`);
    doc.text(`Total Amount : ₹${invoice.totalAmount}`);
    doc.text(`Payment Status : ${invoice.paymentStatus}`);
    doc.text(`Issue Date : ${formatDate(invoice.issueDate)}`);
    doc.text(`Due Date : ${formatDate(invoice.dueDate)}`);

    doc.moveDown();

    doc.text(`Notes : ${invoice.notes}`);

    doc.moveDown();

    doc.text("Thank you for doing business with us.", {
        align: "center",
    });

    doc.end();

    return new Promise((resolve, reject) => {
        writeStream.on("finish", () => resolve(filePath));
        writeStream.on("error", reject);
        doc.on("error", reject);
    });
};

module.exports = generatePDF;