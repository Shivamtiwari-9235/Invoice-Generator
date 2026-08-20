import { useEffect, useState } from "react";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";

const ClientForm = ({ initialValues, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    companyName: "",
    gstNumber: "",
    address: "",
  });

  useEffect(() => {
    setFormData({
      clientName: initialValues?.clientName || "",
      email: initialValues?.email || "",
      phone: initialValues?.phone || "",
      companyName: initialValues?.companyName || "",
      gstNumber: initialValues?.gstNumber || "",
      address: initialValues?.address || "",
    });
  }, [initialValues]);

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(formData);
      }}
    >
      <Input
        name="clientName"
        label="Client Name"
        value={formData.clientName}
        onChange={(event) => setFormData((previous) => ({ ...previous, clientName: event.target.value }))}
        required
      />
      <Input
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={(event) => setFormData((previous) => ({ ...previous, email: event.target.value }))}
        required
      />
      <Input
        name="phone"
        label="Phone"
        value={formData.phone}
        onChange={(event) => setFormData((previous) => ({ ...previous, phone: event.target.value }))}
      />
      <Input
        name="companyName"
        label="Company Name"
        value={formData.companyName}
        onChange={(event) => setFormData((previous) => ({ ...previous, companyName: event.target.value }))}
      />
      <Input
        name="gstNumber"
        label="GST Number"
        value={formData.gstNumber}
        onChange={(event) => setFormData((previous) => ({ ...previous, gstNumber: event.target.value }))}
      />
      <Input
        name="address"
        label="Address"
        value={formData.address}
        onChange={(event) => setFormData((previous) => ({ ...previous, address: event.target.value }))}
      />

      <div className="mt-2 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Client"}
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;