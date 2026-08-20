const express = require("express");
const cors = require("cors");

const authRoutes = require("./Routes/auth.routes");
const clientRoutes = require("./Routes/client.routes");
const invoiceRoutes = require("./Routes/invoice.routes");
const paymentRoutes = require("./Routes/Payment.routes");
const aiRoutes = require("./Routes/ai.routes");
const emailRoutes = require("./Routes/email.routes");
const reminderRoutes = require("./Routes/reminder.routes");
const dashboardRoutes = require("./Routes/dashboard.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Invoice Generator Backend API is Running Successfully."
    });
});

app.use("/api/auth", authRoutes);

app.use("/api/client", clientRoutes);

app.use("/api/invoice", invoiceRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/email", emailRoutes);

app.use("/api/reminder", reminderRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found."
    });
});


module.exports = app;