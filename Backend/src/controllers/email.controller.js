const sendEmail = require("../services/email.service");
const buildEmailTemplate = require("../Template/emailTemplate");


const sendEmailFromRequest = async (req, res) => {
	try {
		const { to, subject, message, name, invoiceNumber, dueDate, totalAmount } = req.body;

		if (!to || !subject || !message) {
			return res.status(400).json({
				message: "to, subject, and message are required.",
			});
		}

		const body = buildEmailTemplate({
			name,
			invoiceNumber,
			dueDate,
			totalAmount,
			message,
		});

		await sendEmail(to, subject, body);

		res.status(200).json({
			success: true,
			message: "Email sent successfully.",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};


module.exports = {
	sendEmailFromRequest,
};
