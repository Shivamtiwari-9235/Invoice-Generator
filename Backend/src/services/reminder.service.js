const sendEmail =
require("./email.service");


const sendPaymentReminder = async (
    clientEmail,
    invoice
) => {

    const subject =
        `Invoice Payment Reminder - ${invoice.invoiceNumber}`;


    const message = `

Hello,

This is a reminder regarding your pending invoice.

Invoice Number:
${invoice.invoiceNumber}

Total Amount:
${invoice.totalAmount}

Due Date:
${invoice.dueDate}

Please make the payment as soon as possible.

Thank You.

`;


    await sendEmail(
        clientEmail,
        subject,
        message
    );

};


module.exports =
sendPaymentReminder;