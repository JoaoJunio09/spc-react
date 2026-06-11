export interface NotificationDTO {
	id: number,
	type: 'SUCCESS' | 'INFO' | 'ERROR' | 'WARNING',
	title: string,
	body: string,
	referenceId: number | null,
	referenceType: 'MASS' | 'CATECHUMEN' | 'CATECHIST' | 'PRESENCE' | 'STEP' | null,
	isRead: boolean,
	createdAt: string
} 