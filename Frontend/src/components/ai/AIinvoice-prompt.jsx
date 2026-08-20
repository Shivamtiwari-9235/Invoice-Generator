import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";

const AIInvoicePrompt = ({ value, onChange, onSubmit, loading }) => (
  <form className="grid gap-4 rounded-[28px] border border-slate-200 bg-white p-6" onSubmit={onSubmit}>
    <div>
      <h3 className="text-lg font-semibold text-slate-900">AI prompt</h3>
      <p className="text-sm text-slate-500">Describe the invoice in plain English and let the backend extract fields.</p>
    </div>
    <Input
      name="prompt"
      label="Prompt"
      value={value}
      onChange={onChange}
      placeholder='Create an invoice for XYZ Pvt Ltd for MERN Website Development amount is 25000 GST is 18 percent due date is 15 August and payment within seven days.'
      required
    />
    <Button type="submit" disabled={loading}>
      {loading ? "Generating..." : "Generate Invoice Data"}
    </Button>
  </form>
);

export default AIInvoicePrompt;