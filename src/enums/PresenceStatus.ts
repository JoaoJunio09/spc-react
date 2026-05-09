const PresenceStatus = {
	PRESENT: 'PRESENT',
	PRESENT_LATE: 'PRESENT_LATE',
	ABSENT: 'ABSENT'
} as const;

export type PresenceStatus = typeof PresenceStatus[keyof typeof PresenceStatus];