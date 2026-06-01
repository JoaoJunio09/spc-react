export interface User {
	id: number,
	username: string,
	password: string,
	fullName: string,
	accountNonExpired: boolean,
	accountNonLocked: boolean,
	credentialsNonExpired: boolean,
	enabled: boolean
}