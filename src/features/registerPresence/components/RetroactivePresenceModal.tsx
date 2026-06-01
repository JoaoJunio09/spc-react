import { Trash2, Upload, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InfoDialog from "../../../components/feedback/InfoDialog";
import { useAuthContext } from "../../../context/AuthContext";
import ConflictInTheDatabaseException from "../../../exceptions/database/ConflicInTheDatabaseException";
import type { CatechumenResponse } from "../../../data/catechumen/CatechumenResponse";
import type { PresenceRequest } from "../../../data/presence/PresenceRequest";
import { DefineNameCatechists } from "../../../utils/DefineNameCatechists";
import useRetroactivePresenceModal from "../hooks/useRetroactivePresenceModal";

type RetroactivePresenceModalProps = {
  open: boolean;
  loading?: boolean;
  catechumen?: CatechumenResponse;
  onClose: () => void;
};

function getInitials(firstName?: string, lastName?: string) {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />;
}

function RetroactivePresenceModal({
  open,
  loading = false,
  catechumen,
  onClose
}: RetroactivePresenceModalProps) {
  if (!open) return null;
	if (!catechumen) return null;

	const {
		justification,
		setJustification,
		setProofImage,
		proofImage,
		setProofPreview,
		proofPreview,
		massId,
		registerPresenceMutation,
		infoDialog,
		openInfoDialog,
		closeInfoDialog
	} = useRetroactivePresenceModal();

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const navigate = useNavigate();

	const { username } = useAuthContext();

	useEffect(() => {
		return () => {
			if (proofPreview) {
				URL.revokeObjectURL(proofPreview);
			}
		}
	}, [proofPreview]);

	async function handleConfirm() {
		if (!massId || !catechumen) {
			toast.error('Dados inválidos para registrar a presença');
			return;
		}

		if (!justification) {
			toast.info('Coloque uma justificativa');
			return;
		}

		if (!username) {
			toast.error('Usuário não definido');
			return;
		}

		try {
			const presence: PresenceRequest = {
				id: null,
				username: username,
				catechumenId: catechumen.id,
				massId: Number(massId),
				justification: justification,
				status: "PRESENT_LATE"
			}

			await registerPresenceMutation.mutateAsync(presence);

			openInfoDialog({
				variant: 'success',
				title: "Presença registrada com sucesso",
        description: "A presença do Catequizando foi registrada com sucesso",
        buttonText: "Perfeito, voltar",
        path: "/presencas"
			});

			setTimeout(() => {
				navigate('/presencas');
			}, 6000);
		}
		catch (err) {
			if (err instanceof ConflictInTheDatabaseException) {
				openInfoDialog({
					variant: 'info',
					title: "Presenças já registrada",
					description: "O catequizando já foi registrado com presença",
					buttonText: "Entendi, fechar",
					path: "/presencas"
				});
				return;
			}

			openInfoDialog({
				variant: 'error',
				title: "Erro no servidor",
        description: "Houve um erro inesperado ao tentar registrar as presenças. Verifique sua conexão ou tente novamente em alguns instantes.",
        buttonText: "Fechar",
        path: "/presencas"
			});
		}
	}

	function handleSelectImage(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		if (proofPreview) {
			URL.revokeObjectURL(proofPreview);
		}

		setProofImage(file);
		setProofPreview(URL.createObjectURL(file));
	}

	function handleRemoveImage() {
		if (proofPreview) {
			URL.revokeObjectURL(proofPreview);
		}

		setProofImage(null);
		setProofPreview(null);

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 px-3 py-4 backdrop-blur-[8px] sm:px-4 sm:py-8">
      <article className="font-sans flex max-h-[92vh] w-full max-w-[540px] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]">
        <header className="flex items-start justify-between border-b border-slate-100 px-7 pb-4 pt-6">
          {loading ? (
            <>
              <div className="w-4/5 pr-[30px]">
                <SkeletonBlock className="mb-2 h-[14px] w-full rounded-lg" />
                <SkeletonBlock className="h-[14px] w-[65%] rounded-lg" />
              </div>

              <button
                type="button"
                disabled
                className="flex items-center justify-center rounded-full p-[6px] text-slate-300"
              >
                <X size={20} />
              </button>
            </>
          ) : (
            <>
              <div className="pr-[30px]">
               <h2 className="mb-1 text-[1.32rem] font-bold tracking-[-0.02em] text-slate-800 [font-family:'IBM_Plex_Sans',sans-serif]">
								Registrar presença retroativa
							</h2>
                <p className="text-[0.95rem] font-medium text-slate-500">
                  Explique o motivo do registro tardio da presença.
                </p>
              </div>

              <button
								type="button"
								aria-label="Fechar Modal"
								onClick={onClose}
								className="appearance-none border-0 outline-none focus:outline-none flex items-center justify-center rounded-full p-[6px] text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
							>
								<X size={20} />
							</button>
            </>
          )}
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-7 sm:py-6">
          <div className="flex flex-col gap-5">
            {loading ? (
              <>
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-[18px] py-[14px]">
                  <SkeletonBlock className="h-12 w-12 rounded-full" />

                  <div className="flex-1">
                    <SkeletonBlock className="mb-2 h-[14px] w-[40%]" />
                    <SkeletonBlock className="h-[14px] w-[65%]" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <SkeletonBlock className="h-[14px] w-[40%]" />
                  <SkeletonBlock className="h-[120px] w-full rounded-[12px]" />
                </div>

                <div className="flex flex-col gap-2">
                  <SkeletonBlock className="h-[14px] w-[40%]" />
                  <SkeletonBlock className="h-[100px] w-full rounded-[12px]" />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4 rounded-[16px] border border-slate-200 bg-slate-50 px-[18px] py-[14px]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-200 bg-amber-100 text-[1.15rem] font-extrabold text-amber-700">
                    {getInitials(catechumen?.firstName, catechumen?.lastName)}
                  </div>

                  <div>
                    <h4 className="mb-[2px] text-[1.05rem] font-bold text-slate-800">
                      {catechumen?.firstName} {catechumen?.lastName}
                    </h4>
                    <p className="text-[0.85rem] font-semibold text-slate-500">
                      {DefineNameCatechists.define(catechumen?.step)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="justification-text"
                    className="text-[0.9rem] font-bold uppercase tracking-[0.05em] text-slate-800"
                  >
                    Justificativa
                  </label>

                  <textarea
										id="justification-text"
										value={justification}
										onChange={(e) => setJustification(e.target.value)}
										placeholder="Descreva o motivo pelo qual esta presença está sendo registrada após a missa..."
										className="font-sans appearance-none min-h-[120px] w-full resize-y rounded-[12px] border border-slate-200 bg-slate-50 px-[14px] py-[14px] text-[0.95rem] leading-[1.5] text-slate-800 transition focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-200/40"
									/>

                  <div className="mt-1 text-right text-[0.8rem] font-medium text-slate-500">
                    {justification.length}/500 caracteres
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.9rem] font-bold uppercase tracking-[0.05em] text-slate-800">
                    Anexar comprovante (opcional)
                  </label>

									<label
										htmlFor="proof-image"
										className="flex cursor-pointer flex-col items-center gap-2 rounded-[16px] border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-6 text-center transition hover:border-amber-400 hover:bg-amber-50/40"
									>
										<div className="mb-1 text-slate-500">
											<Upload size={32} />
										</div>
										<h5 className="text-[0.95rem] font-bold text-slate-800">
											Clique ou arraste uma imagem
										</h5>
										<p className="text-[0.8rem] font-medium text-slate-500">
											PNG, JPG até 5MB
										</p>
									</label>

                  <ul className="flex list-none flex-col gap-[6px] pl-1">
                    <li className="flex items-center gap-2 text-[0.8rem] font-medium text-slate-500">
                      <span className="inline-block h-[5px] w-[5px] rounded-full bg-amber-500" />
                      Foto do catequizando na missa
                    </li>
                    <li className="flex items-center gap-2 text-[0.8rem] font-medium text-slate-500">
                      <span className="inline-block h-[5px] w-[5px] rounded-full bg-amber-500" />
                      Assinatura do padre
                    </li>
                    <li className="flex items-center gap-2 text-[0.8rem] font-medium text-slate-500">
                      <span className="inline-block h-[5px] w-[5px] rounded-full bg-amber-500" />
                      Outro comprovante
                    </li>
                  </ul>
                </div>

								<input
									ref={fileInputRef}
									type="file"
									accept="image/png,image/jpeg,image/jpg"
									className="hidden"
									id="proof-image"
									onChange={(e) => handleSelectImage(e)}
								/>

								{proofImage && proofPreview && (
									<div className="mt-1 rounded-[10px] border border-slate-200 bg-slate-100 px-[14px] py-[10px]">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div className="flex h-[44px] w-[44px] items-center justify-center rounded-[6px] border border-slate-200 bg-slate-200 text-slate-500">
													<img
														src={proofPreview}
														alt="Pré-visualização do comprovante"
														className="h-full w-full object-cover"
													/>
												</div>

												<div>
													<h6 className="text-[0.85rem] font-bold text-slate-800">
														{proofImage.name}
													</h6>
													<span className="text-[0.75rem] font-medium text-slate-500">
														{(proofImage.size / 1024 / 1024).toFixed(2)} MB
													</span>
												</div>
											</div>

											<button
												type="button"
												onClick={handleRemoveImage}
												aria-label="Remover Arquivo"
												className="cursor-pointer appearance-none border-0 outline-none focus:outline-none flex items-center justify-center rounded-[6px] p-[6px] text-slate-500 transition hover:bg-slate-200 hover:text-red-500"
											>
												<Trash2 size={16} />
											</button>
										</div>
									</div>
								)}
              </>
            )}
          </div>
        </div>

        <footer className="flex flex-col-reverse gap-3 border-t border-slate-100 px-4 pb-4 pt-4 sm:flex-row sm:justify-end sm:px-7 sm:pb-6 sm:pt-[18px]">
          {loading ? (
            <>
              <SkeletonBlock className="h-[44px] w-[100px] rounded-[10px]" />
              <SkeletonBlock className="h-[44px] w-[160px] rounded-[10px]" />
            </>
          ) : (
            <>
              <button
								type="button"
								onClick={onClose}
								className="appearance-none border-0 outline-none focus:outline-none inline-flex items-center justify-center rounded-[10px] bg-slate-50 px-6 py-3 text-[0.95rem] font-bold text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
							>
								Cancelar
							</button>

              <button
								type="button"
								onClick={() => handleConfirm()}
								className="appearance-none border-0 outline-none focus:outline-none inline-flex items-center justify-center rounded-[10px] bg-amber-500 px-6 py-3 text-[0.95rem] font-bold text-white shadow-[0_4px_6px_-1px_rgba(245,158,11,0.2)] transition hover:-translate-y-[1px] hover:bg-amber-600"
							>
								Confirmar presença
							</button>
            </>
          )}
        </footer>
      </article>

			<InfoDialog
				open={infoDialog.open}
				onOpenChange={(open) => {
					if (!open) closeInfoDialog()
				}}
				variant={infoDialog.variant}
				title={infoDialog.title}
				description={infoDialog.description}
				buttonText={infoDialog.buttonText}
				path={infoDialog.path}
			/>
    </div>
  );
}

export default RetroactivePresenceModal;