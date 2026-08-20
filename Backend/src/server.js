require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const startReminderCron = require("./cron/reminder.cron");

const requiredEnv = ["MONGO_URI", "JWT_SECRET"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
    console.error(`Missing required environment variable(s): ${missingEnv.join(", ")}`);
    process.exit(1);
}

connectDB();

startReminderCron();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {

    console.log(
        `Server Running On Port ${PORT}`
    );

});