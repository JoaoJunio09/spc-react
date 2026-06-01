import * as Dialog from "@radix-ui/react-dialog";

type LoadingDialogProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  status?: string;
  progress?: number;
  preventClose?: boolean;
};

function LoadingDialog({
  open,
  onOpenChange,
  title,
  description,
  status,
  progress,
  preventClose = true,
}: LoadingDialogProps) {
  const hasProgress = typeof progress === "number";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-100 bg-slate-950/75 backdrop-blur-sm" />

        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-150 w-[min(92vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-8 py-9 text-center shadow-2xl outline-none"
          onInteractOutside={(event) => {
            if (preventClose) event.preventDefault();
          }}
          onEscapeKeyDown={(event) => {
            if (preventClose) event.preventDefault();
          }}
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <div className="h-14 w-14 animate-spin rounded-full border-[6px] border-slate-200 border-t-blue-600" />
          </div>

          <Dialog.Title className="text-xl font-bold tracking-normal text-slate-950">
            {title}
          </Dialog.Title>

          {description && (
            <Dialog.Description className="mt-2 text-sm leading-6 text-slate-500">
              {description}
            </Dialog.Description>
          )}

          {(status || hasProgress) && (
            <div className="mt-6 space-y-3">
              {status && (
                <p className="text-sm font-medium text-slate-700">
                  {status}
                </p>
              )}

              {hasProgress ? (
                <div className="space-y-2">
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                    />
                  </div>

                  <p className="text-xs font-medium text-slate-500">
                    {Math.round(progress)}%
                  </p>
                </div>
              ) : (
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-600" />
                </div>
              )}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default LoadingDialog;