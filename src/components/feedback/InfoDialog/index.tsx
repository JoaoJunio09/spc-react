import * as Dialog from "@radix-ui/react-dialog";
import "./index.css";
import { useNavigate } from "react-router-dom";

type InfoDialogVariant = "success" | "error" | "info" | "warning";

type InfoDialogProps = {
  open: boolean;
  title: string;
  description: string;
  variant?: InfoDialogVariant;
  buttonText?: string;
  path?: string;
  onOpenChange: (open: boolean) => void;
  onClose?: () => void;
};

function InfoDialog({
  open,
  title,
  description,
  variant = "info",
  buttonText = "Entendi",
  path = '/inicio',
  onOpenChange,
  onClose,
}: InfoDialogProps) {

  const navigate = useNavigate();

  function handleClose() {
    onOpenChange(false);
    onClose?.();
    navigate(path);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="spc-info-dialog__overlay" />

        <Dialog.Content className={`spc-info-dialog__content spc-info-dialog__content--${variant}`}>
          <div className={`spc-info-dialog__accent spc-info-dialog__accent--${variant}`} />

          <div className="spc-info-dialog__header">
            <div className={`spc-info-dialog__icon spc-info-dialog__icon--${variant}`}>
              {variant === "success" && "✓"}
              {variant === "error" && "!"}
              {variant === "info" && "i"}
              {variant === "warning" && "!"}
            </div>

            <div className="spc-info-dialog__heading">
              <Dialog.Title className="spc-info-dialog__title">
                {title}
              </Dialog.Title>

              <Dialog.Description className="spc-info-dialog__description">
                {description}
              </Dialog.Description>
            </div>
          </div>

          <div className="spc-info-dialog__actions">
            <button
              type="button"
              className={`spc-info-dialog__button spc-info-dialog__button--${variant}`}
              onClick={handleClose}
            >
              {buttonText}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default InfoDialog;