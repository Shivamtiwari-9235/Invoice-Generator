const generateInvoiceNumber = () => {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `INV-${timestamp}-${randomSuffix}`;
};

module.exports = generateInvoiceNumber;