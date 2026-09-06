import { forwardRef } from "react";
import type { CatechumenResponse } from "../../../data/catechumen/CatechumenResponse";
import type { History } from "../hooks/useInvidualPresence";
import { FormatStep } from "../../../utils/FormatStep";
import { UtilsDate } from "../../../utils/UtilsDate";

type ReportTemplateProps = {
	catechumen: CatechumenResponse;
	history: History[];
};

function formatLabel(value: string) {
	return value
		.toLowerCase()
		.split("_")
		.map(w => w.charAt(0).toUpperCase() + w.slice(1))
		.join(" ");
}

const ReportTemplate = forwardRef<HTMLDivElement, ReportTemplateProps>(
	({ catechumen, history }, ref) => {
		const presences = history.filter(h => h.status === "present").length;
		const absences = history.filter(h => h.status === "absent").length;
		const total = history.length;
		const rate = catechumen.currentFrequency;

		const rateLabel =
			rate >= 75 ? "Boa Frequência" : rate >= 50 ? "Atenção" : "Baixa Frequência";
		const rateColor = rate >= 75 ? "#059669" : rate >= 50 ? "#d97706" : "#e11d48";
		const rateBg = rate >= 75 ? "#ecfdf5" : rate >= 50 ? "#fffbeb" : "#fff1f2";

		const emissionDate = new Date().toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "long",
			year: "numeric"
		});

		return (
			<div
				ref={ref}
				style={{
					fontFamily: "'Segoe UI', Arial, sans-serif",
					color: "#1e293b",
					padding: "28px",
					width: "100%"
				}}
			>
				<style>{`
					@media print {
						@page { size: A4; margin: 14mm; }
						body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
						table { page-break-inside: auto; }
						tr { page-break-inside: avoid; }
						thead { display: table-header-group; }
					}
				`}</style>

				{/* Cabeçalho */}
				<header
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
						borderBottom: "3px solid #ea580c",
						paddingBottom: "16px",
						marginBottom: "24px"
					}}
				>
					<div>
						<h1 style={{ fontSize: "22px", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
							Relatório de Frequência
						</h1>
						<p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0", fontWeight: 600 }}>
							Catequese Paroquial • {formatLabel(String(catechumen.communityOrParish))}
						</p>
					</div>
					<div style={{ textAlign: "right" }}>
						<span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
							Emitido em
						</span>
						<p style={{ fontSize: "13px", fontWeight: 700, margin: "2px 0 0" }}>{emissionDate}</p>
					</div>
				</header>

				{/* Dados do catequizando */}
				<section style={{ marginBottom: "20px" }}>
					<span style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
						Catequizando
					</span>
					<h2 style={{ fontSize: "20px", fontWeight: 800, margin: "2px 0 8px" }}>
						{catechumen.firstName} {catechumen.lastName}
					</h2>
					<div style={{ display: "flex", gap: "24px", fontSize: "13px", fontWeight: 600, color: "#475569" }}>
						<span><strong style={{ color: "#1e293b" }}>Turma:</strong> {FormatStep.format(catechumen.step.stepName)}</span>
						<span>
							<strong style={{ color: "#1e293b" }}>
								{catechumen.step.catechists.length > 1 ? "Catequistas:" : "Catequista:"}
							</strong>{" "}
							{catechumen.step.catechists.map(c => c.firstName).join(" • ")}
						</span>
					</div>
				</section>

				{/* Cards de indicadores */}
				<section style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
					{[
						{ label: "Frequência", value: `${rate}%`, color: rateColor },
						{ label: "Presenças", value: presences, color: "#059669" },
						{ label: "Ausências", value: absences, color: "#e11d48" },
						{ label: "Total de Missas", value: total, color: "#334155" }
					].map(card => (
						<div
							key={card.label}
							style={{
								border: "1px solid #e2e8f0",
								borderRadius: "12px",
								padding: "10px 12px",
								background: "#f8fafc"
							}}
						>
							<span style={{ fontSize: "9px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>
								{card.label}
							</span>
							<div style={{ fontSize: "20px", fontWeight: 800, color: card.color }}>{card.value}</div>
						</div>
					))}
				</section>

				{/* Barra de aproveitamento */}
				<section style={{ marginBottom: "24px" }}>
					<div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 700, marginBottom: "4px" }}>
						<span style={{ color: "#94a3b8", textTransform: "uppercase" }}>Aproveitamento</span>
						<span
							style={{
								color: rateColor,
								background: rateBg,
								padding: "2px 8px",
								borderRadius: "999px",
								textTransform: "uppercase",
								fontSize: "10px"
							}}
						>
							{rateLabel}
						</span>
					</div>
					<div style={{ width: "100%", height: "8px", background: "#e2e8f0", borderRadius: "999px", overflow: "hidden" }}>
						<div style={{ width: `${rate}%`, height: "100%", background: rateColor }} />
					</div>
				</section>

				{/* Tabela de presenças */}
				<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
					<thead>
						<tr style={{ background: "#1e293b" }}>
							{["Encontro / Missa", "Local", "Data", "Horário", "Situação"].map(col => (
								<th
									key={col}
									style={{
										textAlign: "left",
										color: "white",
										padding: "8px 10px",
										fontWeight: 700,
										fontSize: "10px",
										textTransform: "uppercase"
									}}
								>
									{col}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{history.map((record, index) => {
							const isPresent = record.status === "present";
							return (
								<tr
									key={record.mass?.id ?? index}
									style={{ background: index % 2 === 0 ? "#ffffff" : "#f8fafc" }}
								>
									<td style={{ padding: "8px 10px", borderBottom: "1px solid #e2e8f0", fontWeight: 600 }}>
										{record.mass?.title}
									</td>
									<td style={{ padding: "8px 10px", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
										{record.mass?.location === "MATRIZ" ? "Matriz São Sebastião" : "Capela do Divino Espírito Santo"}
									</td>
									<td style={{ padding: "8px 10px", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
										{UtilsDate.formatDateTimeForDate(record.mass.dateTime)}
									</td>
									<td style={{ padding: "8px 10px", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
										{UtilsDate.formatDateTimeThisMissaForTime(record.mass.dateTime)}
									</td>
									<td style={{ padding: "8px 10px", borderBottom: "1px solid #e2e8f0" }}>
										<span
											style={{
												padding: "3px 8px",
												borderRadius: "999px",
												fontWeight: 700,
												fontSize: "10px",
												textTransform: "uppercase",
												color: isPresent ? "#059669" : "#e11d48",
												background: isPresent ? "#ecfdf5" : "#fff1f2"
											}}
										>
											{isPresent ? "Presente" : "Ausente"}
										</span>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>

				{/* Assinaturas */}
				<footer style={{ marginTop: "48px", display: "flex", justifyContent: "space-between", gap: "40px" }}>
					<div style={{ flex: 1, textAlign: "center" }}>
						<div style={{ borderTop: "1px solid #94a3b8", paddingTop: "6px", fontSize: "11px", color: "#64748b", fontWeight: 600 }}>
							Assinatura do(a) Catequista
						</div>
					</div>
					<div style={{ flex: 1, textAlign: "center" }}>
						<div style={{ borderTop: "1px solid #94a3b8", paddingTop: "6px", fontSize: "11px", color: "#64748b", fontWeight: 600 }}>
							Assinatura do(a) Responsável
						</div>
					</div>
				</footer>
			</div>
		);
	}
);

ReportTemplate.displayName = "ReportTemplate";

export default ReportTemplate;