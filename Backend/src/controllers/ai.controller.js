const askAI = require("../services/ai.service");
const cleanValue = (value = "") =>
	value
		.replace(/[.\s]+$/g, "")
		.trim();


const getDefaultDueDate = () => {
	const date = new Date();
	date.setDate(date.getDate() + 7);
	return date.toISOString().split("T")[0];
};

const buildFallbackInvoiceData = (prompt = "") => {
	const text = prompt.replace(/\s+/g, " ").trim();
	const clientMatch = text.match(/(?:for|client(?: name)? is)\s+([^\.\n,]+)/i);
	const serviceMatch = text.match(/service(?: description)? is\s+([^\.\n,]+)/i);
	const amountMatch = text.match(/amount is\s+([0-9,.]+)/i);
	const gstMatch = text.match(/gst(?: percentage)? is\s+([0-9,.]+)/i);
	const dueDateMatch = text.match(/due date is\s+([^\.\n,]+)/i);
	const notesMatch = text.match(/notes?:\s*([\s\S]*)$/i);

	return {
		clientName: cleanValue(clientMatch?.[1] || ""),
		serviceDescription: cleanValue(serviceMatch?.[1] || ""),
		amount: Number(amountMatch?.[1]?.replace(/,/g, "") || 0),
		gstPercentage: Number(gstMatch?.[1]?.replace(/,/g, "") || 0),
		dueDate: cleanValue(dueDateMatch?.[1] || getDefaultDueDate()),
		notes: cleanValue(notesMatch?.[1] || ""),
	};
};


const extractJsonFromResponse = (responseText) => {
	const cleanedText = responseText
		.replace(/```json/gi, "")
		.replace(/```/g, "")
		.trim();

	const jsonStart = cleanedText.indexOf("{");
	const jsonEnd = cleanedText.lastIndexOf("}");

	if (jsonStart === -1 || jsonEnd === -1) {
		throw new Error("AI did not return JSON data.");
	}

	return JSON.parse(cleanedText.slice(jsonStart, jsonEnd + 1));
};


const generateInvoiceData = async (req, res) => {
	try {
		const { prompt } = req.body;

		if (!prompt) {
			return res.status(400).json({
				message: "Prompt is required.",
			});
		}

		const aiPrompt = `
Extract invoice details from the user request and return only valid JSON.

Required keys:
- clientName
- serviceDescription
- amount
- gstPercentage
- dueDate
- notes

User request:
${prompt}

Return only JSON.
`;

		const aiResponse = await askAI(aiPrompt);
		const invoiceData = extractJsonFromResponse(aiResponse || "");

		invoiceData.amount = Number(invoiceData.amount || 0);
		invoiceData.gstPercentage = Number(invoiceData.gstPercentage || 0);
		invoiceData.dueDate = cleanValue(invoiceData.dueDate || getDefaultDueDate());

		res.status(200).json({
			success: true,
			invoiceData,
		});
	} catch (error) {
		res.status(200).json({
			success: true,
			invoiceData: buildFallbackInvoiceData(req.body?.prompt),
			message: "AI fallback used because Ollama response was unavailable or invalid.",
		});
	}
};


module.exports = {
	generateInvoiceData,
};
