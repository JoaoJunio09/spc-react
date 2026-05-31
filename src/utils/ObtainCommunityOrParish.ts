import type { CommunityOrParish } from "../enums/CommunityOrParish";

function obtain(): CommunityOrParish | null {
	let communityOrParish: CommunityOrParish | null = null;

	const communityOrParishStorage = sessionStorage.getItem('communityOrParish');
		
	if (communityOrParishStorage === 'SAO_SEBASTIAO') {
		communityOrParish = "SAO_SEBASTIAO";
	}
	else if (communityOrParishStorage === 'DIVINO_ESPIRITO_SANTO') {
		communityOrParish = "DIVINO_ESPIRITO_SANTO";
	}	
	else {
		communityOrParish = "BOTH";
	}

	return communityOrParish;
}

export const ObtainCommunityOrParish = {
	obtain
}