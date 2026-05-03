const MassLocation = {
	MATRIZ: 'MATRIZ',
	CAPELA_DO_DIVINO: 'CAPELA_DO_DIVINO'
} as const;

export type MassLocation = typeof MassLocation[keyof typeof MassLocation];