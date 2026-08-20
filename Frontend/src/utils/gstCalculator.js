export const calculateGST = (amount = 0, gstPercentage = 0) => {
  const baseAmount = Number(amount) || 0;
  const gstRate = Number(gstPercentage) || 0;
  const gstAmount = (baseAmount * gstRate) / 100;
  const totalAmount = baseAmount + gstAmount;

  return {
    gstAmount,
    totalAmount,
  };
};