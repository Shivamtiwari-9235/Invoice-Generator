const getDashboardStats = async (Invoice, userId) => {
	const totalInvoices = await Invoice.countDocuments({
		createdBy: userId,
	});

	const paidInvoices = await Invoice.countDocuments({
		createdBy: userId,
		paymentStatus: "Paid",
	});

	const pendingInvoices = await Invoice.countDocuments({
		createdBy: userId,
		paymentStatus: "Pending",
	});

	const overdueInvoices = await Invoice.countDocuments({
		createdBy: userId,
		paymentStatus: "Overdue",
	});

	const invoices = await Invoice.find({
		createdBy: userId,
	});

	const totalRevenue = invoices.reduce((sum, invoice) => sum + (invoice.totalAmount || 0), 0);

	return {
		totalInvoices,
		paidInvoices,
		pendingInvoices,
		overdueInvoices,
		totalRevenue,
	};
};

module.exports = getDashboardStats;
