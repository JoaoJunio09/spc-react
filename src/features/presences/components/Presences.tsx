import {
  ChevronDown
} from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import type { LiturgicalCalendarResponse } from '../../../data/liturgicalCalendar/LiturgicalCalendarResponse';
import useLiturgicalCalendar from '../hooks/useLiturgicalCalender';
import usePresences from '../hooks/usePresences';
import Masses from './Masses';
import Catechumens from './Catechumens';

function Presences() {
	const { liturgicalCalendars, loading: loadingLiturgicalCalendar, error: errorLiturgicalCalendar } = useLiturgicalCalendar();
	const {
    masses,
    presences,
    loadingPresences,
    errorPresences,
    filterMasses,
    filterByFullName,
    filterByMass
  } = usePresences();

	useEffect(() => {
		if (loadingLiturgicalCalendar) {
			toast.loading('Carregando Missas');
		}
		else {
			toast.dismiss();
		}

		if (errorLiturgicalCalendar) {
			toast.error('Erro ao carregar as missas do calendário litúrgico');
		}
	}, [loadingLiturgicalCalendar, errorLiturgicalCalendar]);

	function handleFilterMasses(e: React.ChangeEvent<HTMLSelectElement>) {
		filterMasses(e.target.value);
	}

  return (
    <main className="w-full max-w-[1100px] mx-auto px-6 overflow-x-hidden">
      <section className="pt-12 pb-8">
        <h2 className="text-[2rem] font-extrabold uppercase text-[var(--text-main)]">
          HISTÓRICO DE PRESENÇAS
        </h2>

        <p className="mt-2 text-[1.1rem] text-[var(--text-muted)]">
          Selecione um período litúrgico para gerenciar e visualizar as presenças realizadas.
        </p>
      </section>

      <section className="mb-10 rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)]">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="liturgicalCalendar"
            className="text-[0.9rem] font-bold uppercase tracking-wide text-[var(--text-main)]"
          >
            Calendário Litúrgico
          </label>

          <div className="relative flex items-center">
            <select
              name="liturgicalCalendar"
              id="liturgicalCalendar"
              className="w-full appearance-none rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-[18px] py-[14px] text-[1.1rem] font-semibold text-[var(--text-main)] transition-all duration-200 cursor-pointer focus:border-[var(--primary)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_4px_rgba(245,158,11,0.15)]"
							onChange={(e) => handleFilterMasses(e)}
						>
							<option hidden>Selecione uma Missa</option>
							{liturgicalCalendars.map((liturgicalCalendar: LiturgicalCalendarResponse) => (
								<option key={liturgicalCalendar.id} value={liturgicalCalendar.title}>{liturgicalCalendar.title}</option>
							))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-[18px] size-5 text-[var(--text-muted)]" />
          </div>
        </div>
      </section>
			
      {masses.length > 0
        ? <Masses
            masses={masses}
            onFilter={filterByMass}
          />
        : null
      }

      {masses.length > 0 
        ? 
          <Catechumens
            presences={presences}
            onFilter={filterByFullName}
            isLoading={loadingPresences}
          />
        :
          null
      }
      
    </main>
  );
}

export default Presences;