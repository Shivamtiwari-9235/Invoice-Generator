const buildEmailTemplate = ({
	name = "Customer",
	invoiceNumber = "",
	dueDate = "",
	totalAmount = "",
	message = "",
}) => {
	return `
Hello ${name},

${message}

${invoiceNumber ? `Invoice Number: ${invoiceNumber}` : ""}
${dueDate ? `Due Date: ${dueDate}` : ""}
${totalAmount !== "" ? `Total Amount: ${totalAmount}` : ""}

Thank you.
`;
};


module.exports = buildEmailTemplate;
