const mongoose = require("mongoose");

const emailLogSchema = new mongoose.Schema(
	{
		to: {
			type: String,
			required: true,
			trim: true,
		},
		subject: {
			type: String,
			required: true,
			trim: true,
		},
		status: {
			type: String,
			enum: ["Sent", "Failed"],
			default: "Sent",
		},
		invoice: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Invoice",
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Emailing", emailLogSchema);
