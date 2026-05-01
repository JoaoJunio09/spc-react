const CommunityOrParish = {
	SAO_SEBASTIAO: 'SAO_SEBASTIAO',
	DIVINO_ESPIRITO_SANTO: 'DIVINO_ESPIRITO_SANTO'
} as const;

export type CommunityOrParish = typeof CommunityOrParish[keyof typeof CommunityOrParish];