import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Seo from "../components/seo/Seo.jsx";
import Loader from "../components/common/Loader.jsx";
import InvoiceForm from "../components/invoices/InvoiceForm.jsx";
import { createInvoice } from "../services/invoice.service";
import { getClients } from "../services/client.service";

const CreateInvoice = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const draft = location.state?.draft || location.state?.aiDraft || null;

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

  const handleSubmit = async (payload) => {
    if (!payload.client) {
      toast.error("Please select a client before creating the invoice");
      return;
    }

    setSaveLoading(true);
    try {
      await createInvoice(payload);
      toast.success("Invoice created successfully");
      navigate("/app/invoices");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create invoice");
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return <Loader label="Preparing invoice form..." />;
  }

  return (
    <div className="grid gap-6">
      <Seo title="Create Invoice" path="/app/create-invoice" />
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Create invoice</h1>
        <p className="mt-1 text-sm text-slate-500">Select a client, add service details, and preview the GST summary before saving.</p>
      </div>

      <InvoiceForm clients={clients} initialValues={draft} onSubmit={handleSubmit} loading={saveLoading} />
    </div>
  );
};

export default CreateInvoice;