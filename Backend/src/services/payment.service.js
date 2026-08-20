const updateOverdueInvoices = async (Invoice) => {

    const today = new Date();

    await Invoice.updateMany(

        {
            dueDate: { $lt: today },
            paymentStatus: "Pending",
        },

        {
            paymentStatus: "Overdue",
        }

    );

};


module.exports = updateOverdueInvoices;