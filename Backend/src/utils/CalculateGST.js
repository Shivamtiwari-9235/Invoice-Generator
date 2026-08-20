const calculateGST = (amount, gstPercentage) => {
	const numericAmount = Number(amount || 0);
	const numericGstPercentage = Number(gstPercentage || 0);
	const gstAmount = (numericAmount * numericGstPercentage) / 100;
	const totalAmount = numericAmount + gstAmount;

	return {
		gstAmount,
		totalAmount,
	};
};

module.exports = calculateGST;
