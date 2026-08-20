import { Building2, Mail, Phone } from "lucide-react";
import Button from "../common/Button.jsx";
import { getInitials } from "../../utils/helpers";

const ClientCard = ({ client, onEdit, onDelete }) => (
  <div className="soft-card rounded-[28px] p-5">
    <div className="flex items-start gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-600 text-lg font-semibold text-white">
        {getInitials(client.clientName)}
      </div>
      <div className="flex-1">
        <h3 className="text-base font-semibold text-slate-900">{client.clientName}</h3>
        <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          <Building2 size={14} />
          {client.companyName || "Independent freelancer client"}
        </p>
        <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          <Mail size={14} />
          {client.email}
        </p>
        {client.phone ? (
          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <Phone size={14} />
            {client.phone}
          </p>
        ) : null}
      </div>
    </div>

    <div className="mt-5 flex gap-3">
      <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(client)}>
        Edit
      </Button>
      <Button variant="danger" size="sm" className="flex-1" onClick={() => onDelete(client)}>
        Delete
      </Button>
    </div>
  </div>
);

export default ClientCard;