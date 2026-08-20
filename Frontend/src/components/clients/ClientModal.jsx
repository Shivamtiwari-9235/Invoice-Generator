import Modal from "../common/Modal.jsx";
import ClientForm from "./ClientForm.jsx";

const ClientModal = ({ open, onClose, title = "Add Client", initialValues, onSubmit, loading }) => (
  <Modal open={open} title={title} description="Create or update a client profile." onClose={onClose} size="lg">
    <ClientForm initialValues={initialValues} onSubmit={onSubmit} onCancel={onClose} loading={loading} />
  </Modal>
);

export default ClientModal;