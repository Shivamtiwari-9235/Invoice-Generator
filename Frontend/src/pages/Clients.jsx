import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../components/seo/Seo.jsx";
import SearchBar from "../components/common/SearchBar.jsx";
import Button from "../components/common/Button.jsx";
import Loader from "../components/common/Loader.jsx";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";
import ClientModal from "../components/clients/ClientModal.jsx";
import ClientCard from "../components/clients/ClientCard.jsx";
import ClientTable from "../components/clients/ClientTable.jsx";
import { createClient, deleteClient, getClients, updateClient } from "../services/client.service";

const emptyClient = {
  clientName: "",
  email: "",
  phone: "",
  companyName: "",
  gstNumber: "",
  address: "",
};

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeClient, setActiveClient] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadClients = async () => {
    setLoading(true);
    try {
      const response = await getClients();
      setClients(response.data?.clients || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return clients;
    }

    return clients.filter((client) =>
      [client.clientName, client.email, client.companyName, client.gstNumber]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(query))
    );
  }, [clients, search]);

  const handleSubmit = async (payload) => {
    setSaveLoading(true);
    try {
      if (activeClient) {
        await updateClient(activeClient._id, payload);
        toast.success("Client updated successfully");
      } else {
        await createClient(payload);
        toast.success("Client added successfully");
      }

      setModalOpen(false);
      setActiveClient(null);
      await loadClients();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save client");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      await deleteClient(deleteTarget._id);
      toast.success("Client deleted successfully");
      setDeleteTarget(null);
      await loadClients();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete client");
    }
  };

  return (
    <div className="grid gap-6">
      <Seo title="Clients" path="/app/clients" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Client management</h1>
          <p className="mt-1 text-sm text-slate-500">Add, edit, search, and remove clients from your freelance workspace.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={16} />
          Add Client
        </Button>
      </div>

      <SearchBar value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, email, company, or GST" />

      {loading ? (
        <Loader label="Loading clients..." />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:hidden">
            {filteredClients.map((client) => (
              <ClientCard
                key={client._id}
                client={client}
                onEdit={(item) => {
                  setActiveClient(item);
                  setModalOpen(true);
                }}
                onDelete={(item) => setDeleteTarget(item)}
              />
            ))}
          </div>

          <div className="hidden xl:block">
            <ClientTable
              clients={filteredClients}
              onEdit={(item) => {
                setActiveClient(item);
                setModalOpen(true);
              }}
              onDelete={(item) => setDeleteTarget(item)}
            />
          </div>
        </>
      )}

      <ClientModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setActiveClient(null);
        }}
        title={activeClient ? "Edit Client" : "Add Client"}
        initialValues={activeClient || emptyClient}
        loading={saveLoading}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete client"
        description="This action cannot be undone. All invoices linked to this client will still remain in the database."
        confirmLabel="Delete"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default Clients;