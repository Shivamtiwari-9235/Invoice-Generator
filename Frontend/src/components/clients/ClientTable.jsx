import Button from "../common/Button.jsx";
import EmptyState from "../common/EmptyState.jsx";
import { formatDate } from "../../utils/dateFormatter";

const ClientTable = ({ clients = [], onEdit, onDelete }) => {
  if (!clients.length) {
    return (
      <EmptyState
        title="No clients yet"
        description="Add your first client to start creating invoices quickly and track their payments in one place."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Company</th>
              <th className="px-6 py-4 font-medium">Created</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {clients.map((client) => (
              <tr key={client._id}>
                <td className="px-6 py-4 font-medium text-slate-900">{client.clientName}</td>
                <td className="px-6 py-4 text-slate-600">{client.email}</td>
                <td className="px-6 py-4 text-slate-600">{client.companyName || "-"}</td>
                <td className="px-6 py-4 text-slate-600">{formatDate(client.createdAt)}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(client)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => onDelete(client)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientTable;