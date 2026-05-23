import { XCircle } from "lucide-react";
import SectionTitle from "./SectionTitle";

function EmptyState() {
	return (
		<section className="mb-16">
			<SectionTitle>Estado de "Nenhum Resultado"</SectionTitle>

			<div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#CBD5E1] bg-white px-8 py-16 text-center">
				<div className="flex size-16 items-center justify-center rounded-full bg-[#F1F5F9] text-[#94A3B8]">
					<XCircle className="size-8" />
				</div>

				<div>
					<h4 className="mb-1.5 text-xl font-bold text-[var(--text-main)]">
						Nenhum catequizando encontrado
					</h4>

					<p className="mx-auto max-w-xs text-[0.95rem] text-[var(--text-muted)]">
						Não há registros correspondentes para o filtro ou termo pesquisado.
					</p>
				</div>
			</div>
    </section>
	)
}

export default EmptyState;