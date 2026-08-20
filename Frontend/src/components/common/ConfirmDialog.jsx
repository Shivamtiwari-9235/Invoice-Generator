import Modal from "./Modal.jsx";
import Button from "./Button.jsx";

const ConfirmDialog = ({ open, title, description, confirmLabel = "Confirm", cancelLabel = "Cancel", onConfirm, onCancel, danger = false }) => (
  <Modal open={open} title={title} description={description} onClose={onCancel} size="sm">
    <div className="flex justify-end gap-3">
      <Button variant="outline" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button variant={danger ? "danger" : "primary"} onClick={onConfirm}>
        {confirmLabel}
      </Button>
    </div>
  </Modal>
);

export default ConfirmDialog;