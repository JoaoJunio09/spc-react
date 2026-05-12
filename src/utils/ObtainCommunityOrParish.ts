import type { CommunityOrParish } from "../enums/CommunityOrParish";

function obtain(): CommunityOrParish | null {
	let communityOrParish: CommunityOrParish | null = null;
		
	communityOrParish = sessionStorage.getItem('communityOrParish') === 'SAO_SEBASTIAO'
		? 'SAO_SEBASTIAO'
		: 'DIVINO_ESPIRITO_SANTO';
		
	if (!communityOrParish) {
		return null;
	}

	return communityOrParish;
}

export const ObtainCommunityOrParish = {
	obtain
}