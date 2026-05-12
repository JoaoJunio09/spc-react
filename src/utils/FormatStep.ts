function format(stepName: string): string {
	if (stepName === "CRISMA") return "Crisma";
	else if (stepName === "PRE_CRISMA") return "Pré-Crisma";
	else if (stepName === "EUCARISTIA_UM") return "Eucarista 1";
	else if (stepName === "EUCARISTIA_DOIS") return "Eucarista 2";
	else if (stepName === "PRIMEIRA_ETAPA") return "1º Etapa";
	else return "2º Etapa";
}

export const FormatStep = {
	format
}