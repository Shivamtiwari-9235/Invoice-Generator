const Invoice =
require("../models/Invoice");
const updateOverdueInvoices = require("../services/payment.service");
const getDashboardStats = require("../services/dashboard.service");


const dashboardStats =
async(req,res)=>{

try{

await updateOverdueInvoices(Invoice);
paymentStatus:"Paid"
paymentStatus:"Pending"
paymentStatus:"Overdue"

const {
totalInvoices,
paidInvoices,
pendingInvoices,
overdueInvoices,
totalRevenue,
} = await getDashboardStats(Invoice, req.user._id);


res.status(200).json({

success:true,

totalInvoices,

paidInvoices,

pendingInvoices,

overdueInvoices,

totalRevenue,

});


}catch(error){

res.status(500).json({

message:error.message

});

}

};


module.exports = {

dashboardStats

};