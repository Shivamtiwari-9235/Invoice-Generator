const colors = {
  Paid: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Overdue: "bg-rose-50 text-rose-700",
};

const PaymentStatusCards = ({ stats = {} }) => {
  const cards = [
    { label: "Paid", value: stats.paid || 0 },
    { label: "Pending", value: stats.pending || 0 },
    { label: "Overdue", value: stats.overdue || 0 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className={`rounded-[28px] px-5 py-4 ${colors[card.label]}`}>
          <p className="text-sm font-medium">{card.label}</p>
          <p className="mt-2 text-3xl font-semibold">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default PaymentStatusCards;