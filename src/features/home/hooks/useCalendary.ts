import { useMemo, useState } from "react";

type CalendarDay = {
  day: number | null;
  dateString: string | null;
  isMass: boolean;
};

type UseCalendaryProps = {
  massesDates?: string[] | null;
};

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function useCalendary({ massesDates = [] }: UseCalendaryProps = {}) {
	const safeMassesDates = massesDates ?? [];

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const currentMonthLabel = `${MONTH_NAMES[month]} ${year}`;

  const daysOfMonth = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days: CalendarDay[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push({
        day: null,
        dateString: null,
        isMass: false,
      });
    }

    for (let day = 1; day <= lastDate; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

      days.push({
        day,
        dateString,
        isMass: safeMassesDates.includes(dateString),
      });
    }

    return days;
  }, [year, month, massesDates]);

  function goToPreviousMonth() {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  function goToNextMonth() {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }

  return {
    currentMonthLabel,
    daysOfMonth,
    goToPreviousMonth,
    goToNextMonth,
  };
}

export default useCalendary;