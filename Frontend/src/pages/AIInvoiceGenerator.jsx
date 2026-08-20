import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Seo from "../components/seo/Seo.jsx";
import Loader from "../components/common/Loader.jsx";
import Input from "../components/common/Input.jsx";
import Button from "../components/common/Button.jsx";
import AIInvoicePrompt from "../components/ai/AIinvoice-prompt.jsx";
import AIResultCard from "../components/ai/AIresultCard.jsx";
import AIInvoicePreview from "../components/ai/AI-Invoicepreview.jsx";
import { generateInvoiceData } from "../services/ai.service";
import { createInvoice } from "../services/invoice.service";
import { getClients } from "../services/client.service";
import { matchClientByName } from "../utils/helpers";

const AIInvoiceGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [creating, setCreating] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadClients = async () => {
      try {
        const response = await getClients();
        setClients(response.data?.clients || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load clients");
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  const matchedClient = useMemo(() => {
    if (!result) {
      return null;
    }

    return matchClientByName(clients, result.clientName) || clients.find((client) => client._id === selectedClientId) || null;
  }, [clients, result, selectedClientId]);

  const handleGenerate = async (event) => {
    event.preventDefault();
    setGenerating(true);

    try {
      const response = await generateInvoiceData({ prompt });
      const invoiceData = response.data?.invoiceData || null;
      setResult(invoiceData);

      const autoMatch = matchClientByName(clients, invoiceData?.clientName || "");
      setSelectedClientId(autoMatch?._id || "");

      if (!invoiceData) {
        toast.error("AI did not return invoice data");
        return;
      }

      toast.success(response.data?.message || "AI invoice draft generated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to generate invoice data");
    } finally {
      setGenerating(false);
    }
  };

  const handleCreateInvoice = async () => {
    if (!matchedClient) {
      toast.error("Select or create a matching client before creating the invoice");
      return;
    }

    setCreating(true);
    try {
      await createInvoice({
        client: matchedClient._id,
        serviceDescription: result.serviceDescription,
        amount: result.amount,
        gstPercentage: result.gstPercentage,
        dueDate: result.dueDate,
        notes: result.notes || "Generated from AI prompt",
      });

      toast.success("Invoice created from AI draft");
      navigate("/app/invoices");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create invoice");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <Loader label="Preparing AI generator..." />;
  }

  return (
    <div className="grid gap-6">
      <Seo title="AI Invoice Generator" path="/app/ai" />

      <div>
        <h1 className="text-2xl font-semibold text-slate-900">AI invoice generator</h1>
        <p className="mt-1 text-sm text-slate-500">Write a natural language prompt, let the backend extract data, then create an invoice draft.</p>
      </div>

      <AIInvoicePrompt
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        onSubmit={handleGenerate}
        loading={generating}
      />

      {result ? (
        <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
          <div className="grid gap-4">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6">
              <p className="text-sm font-medium text-slate-700">Select matching client</p>
              <select
                value={selectedClientId}
                onChange={(event) => setSelectedClientId(event.target.value)}
                className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900"
              >
                <option value="">Select a client</option>
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.clientName}
                  </option>
                ))}
              </select>

              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                If the client already exists, the frontend can create the invoice immediately. Otherwise, add the client first from the Clients page.
              </div>
            </div>

            <AIResultCard result={result} client={matchedClient} onCreateInvoice={handleCreateInvoice} loading={creating} />
          </div>
          <AIInvoicePreview result={result} client={matchedClient} />
        </div>
      ) : null}
    </div>
  );
};

export default AIInvoiceGenerator;