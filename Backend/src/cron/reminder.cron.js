const cron =
require("node-cron");

const Invoice =
require("../models/Invoice");

const sendPaymentReminder =
require("../services/reminder.service");
const updateOverdueInvoices = require("../services/payment.service");


const startReminderCron = () => {

cron.schedule(

"0 9 * * *",

async ()=>{


await updateOverdueInvoices(Invoice);


const overdueInvoices =
await Invoice.find({

paymentStatus:"Overdue"

}).populate("client");


for(
const invoice of overdueInvoices
){

await sendPaymentReminder(

invoice.client.email,

invoice

);

}

console.log(
"Reminder Emails Sent."
);


});

};


module.exports =
startReminderCron;