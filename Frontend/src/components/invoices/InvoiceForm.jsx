import { useEffect, useMemo, useState } from "react";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";
import GSTCalculator from "./GSTCalculator.jsx";
import InvoicePreview from "./InvoicePreview.jsx";

const InvoiceForm = ({ clients = [], initialValues, onSubmit, loading = false }) => {
  const defaultState = useMemo(
    () => ({
      client: initialValues?.client || clients[0]?._id || "",
      serviceDescription: initialValues?.serviceDescription || "",
      amount: initialValues?.amount || 0,
      gstPercentage: initialValues?.gstPercentage || 18,
      dueDate: initialValues?.dueDate || "",
      notes: initialValues?.notes || "",
    }),
    [clients, initialValues]
  );

  const [formData, setFormData] = useState(defaultState);

  useEffect(() => {
    setFormData(defaultState);
  }, [defaultState]);

  const selectedClient = clients.find((client) => client._id === formData.client);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "amount" || name === "gstPercentage" ? Number(value) : value,
    }));
  };

  return (
    <form
      className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(formData);
      }}
    >
      <div className="grid gap-4 rounded-[28px] border border-slate-200 bg-white p-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Create invoice</h3>
          <p className="text-sm text-slate-500">Fill the details once and use the preview to confirm everything.</p>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Client</span>
          <select
            name="client"
            value={formData.client}
            onChange={handleChange}
            className="input-focus h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900"
            required
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.clientName} - {client.companyName || client.email}
              </option>
            ))}
          </select>
        </label>

        <Input
          name="serviceDescription"
          label="Service Description"
          value={formData.serviceDescription}
          onChange={handleChange}
          placeholder="Example: MERN website development"
          required
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            name="amount"
            label="Amount"
            type="number"
            min="0"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <Input
            name="gstPercentage"
            label="GST Percentage"
            type="number"
            min="0"
            value={formData.gstPercentage}
            onChange={handleChange}
            required
          />
        </div>

        <Input name="dueDate" label="Due Date" type="date" value={formData.dueDate} onChange={handleChange} required />
        <Input name="notes" label="Notes" value={formData.notes} onChange={handleChange} placeholder="Optional notes" />

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Create Invoice"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        <GSTCalculator amount={formData.amount} gstPercentage={formData.gstPercentage} />
        <InvoicePreview
          invoice={{
            ...formData,
            invoiceNumber: "Draft Preview",
          }}
          client={selectedClient}
        />
      </div>
    </form>
  );
};

export default InvoiceForm;