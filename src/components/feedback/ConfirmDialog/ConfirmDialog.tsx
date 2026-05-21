import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./confirmDialog.css";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
  loading?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
};

function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
  loading = false,
  onOpenChange,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="confirm-dialog-overlay" />

        <AlertDialog.Content className="confirm-dialog-content">
          <AlertDialog.Title className="confirm-dialog-title">
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description className="confirm-dialog-description">
            {description}
          </AlertDialog.Description>

          <div className="confirm-dialog-actions">
            <AlertDialog.Cancel asChild>
              <button
                type="button"
                className="confirm-dialog-button confirm-dialog-button-cancel"
                disabled={loading}
              >
                {cancelText}
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                type="button"
                className={`confirm-dialog-button ${
                  variant === "danger"
                    ? "confirm-dialog-button-danger"
                    : "confirm-dialog-button-confirm"
                }`}
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? "Processando..." : confirmText}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default ConfirmDialog;