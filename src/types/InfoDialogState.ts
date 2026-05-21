export type InfoDialogState = {
	open: boolean;
	variant: 'success' | 'error' | 'info' | 'warning';
	title: string,
	description: string,
	buttonText?: string,
	path?: string
}