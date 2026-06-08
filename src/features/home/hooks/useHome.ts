import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import type { CommunityOrParish } from "../../../enums/CommunityOrParish";
import useMassService from "../../../hooks/useMassService";
import usePresenceService from "../../../hooks/usePresenceService";
import { UtilsDate } from "../../../utils/UtilsDate";

type NextMass = {
	date: Date;
  formattedDate: string;
  formattedHour: string;
	location: string;
}

export type Indicators = {
  name: string | undefined,
  fullName: string | undefined,
  initials: string | undefined,
  communityOrParish: CommunityOrParish | undefined,
	nextMass: NextMass | undefined
}

export type Event = {
	massId?: number,
	massDate?: string,
	massDateTime?: string,
	massLocation?: string,
	title?: string,
	isEvent: boolean
}

const getInitials = (fullName: string): string => {
  const words = fullName.split(' ').filter(word => word.length > 0);
  const first = words[0].charAt(0).toUpperCase();
  const last = words[words.length - 1].charAt(0).toUpperCase();
  return first + last;
};

const formatLocation = (location: string | null | undefined): string => {
  switch (location) {
    case "MATRIZ":
      return "Matriz São Sebastião";
    case "CAPELA_DO_DIVINO":
      return "Divino Espírito Santo";
    default:
      return "Local não informado";
  }
};

const isSameDay = (a: Date, b: Date): boolean =>
  a.getDate() === b.getDate() &&
  a.getMonth() === b.getMonth() &&
  a.getFullYear() === b.getFullYear();

const getDisplayDay = (massDate: Date, now: Date): string => {
  // Hoje
  if (isSameDay(massDate, now)) return "Hoje";

  // Amanhã
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  if (isSameDay(massDate, tomorrow)) return "Amanhã";

  // Até domingo desta semana (inclusive)
  const nextSunday = new Date(now);
  nextSunday.setDate(now.getDate() + (7 - now.getDay()));
  nextSunday.setHours(23, 59, 59, 999);

  if (massDate <= nextSunday) {
    const weekday = massDate.toLocaleDateString("pt-BR", { weekday: "long" });
    return weekday.charAt(0).toUpperCase() + weekday.slice(1);
  }

  // Outra semana — data completa
  return massDate.toLocaleDateString("pt-BR");
};

function useHome() {
	const { auth } = useAuthContext();

	const massService = useMassService();
	const presenceService = usePresenceService();

	const queryPresences = useQuery({
		queryKey: ['presences'],
		queryFn: () => presenceService.getAll({}),
		retry: 1
	});

	const queryMasses = useQuery({
		queryKey: ['masses'],
		queryFn: () => massService.getAll({}),
		retry: 3
	})

	const queryMassesDates = useQuery({
		queryKey: ['massesDates'],
		queryFn: () => massService.getMassesDatesByCommunityOrParish({}),
		retry: 3
	});

	const massesDates = queryMassesDates.data?.map(date => UtilsDate.formatDateTimeThisMissaForDate(date));

	const masses = queryMasses.data ?? [];

	const nextMass = useMemo<NextMass | undefined>(() => {
    if (!masses.length) return undefined;

    const now = new Date();

    const sortedMasses = [...masses].sort(
      (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    );

    // Hoje — missa que ainda não ocorreu
    const todayMass = sortedMasses.find((mass) => {
      const massDate = new Date(mass.dateTime);
      return isSameDay(massDate, now) && massDate.getTime() > now.getTime();
    });

    if (todayMass) {
      const massDate = new Date(todayMass.dateTime);
      return {
        date: massDate,
        formattedDate: "Hoje",
        formattedHour: massDate.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        location: formatLocation(todayMass.location),
      };
    }

    // Amanhã
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const tomorrowMass = sortedMasses.find((mass) =>
      isSameDay(new Date(mass.dateTime), tomorrow)
    );

    if (tomorrowMass) {
      const massDate = new Date(tomorrowMass.dateTime);
      return {
        date: massDate,
        formattedDate: "Amanhã",
        formattedHour: massDate.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        location: formatLocation(tomorrowMass.location),
      };
    }

    // Próxima missa futura (esta semana ou além)
    const futureMass = sortedMasses.find(
      (mass) => new Date(mass.dateTime).getTime() > now.getTime()
    );

    if (!futureMass) return undefined;

    const massDate = new Date(futureMass.dateTime);
    return {
      date: massDate,
      formattedDate: getDisplayDay(massDate, now),
      formattedHour: massDate.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      location: formatLocation(futureMass.location),
    };
  }, [masses]); 

	const dataIndicators: Indicators = {
    name: auth?.fullName.split(' ')[0],
    fullName: auth?.fullName,
    initials: auth?.fullName ? getInitials(auth?.fullName) : '',
    communityOrParish: auth?.communityOrParish,
		nextMass: nextMass
	}

	return {
		presences: queryPresences.data ?? [],
		masses: queryMasses.data ?? [],
		massesDates: massesDates ?? [],
		dataIndicators,
		name: auth?.fullName.split(' ')[0],
		communityOrParish: auth?.communityOrParish === 'SAO_SEBASTIAO'|| auth?.communityOrParish === null
			? 'Paróquia São Sebastião'
			: 'Capela do Divino Espírito Santo',
		
	}
}

export default useHome;