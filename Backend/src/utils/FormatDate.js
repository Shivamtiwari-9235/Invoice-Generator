const formatDate = (value) => {
	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return "Invalid Date";
	}

	return date.toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
};

module.exports = formatDate;
