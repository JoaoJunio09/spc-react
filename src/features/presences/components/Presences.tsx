import {
	ChevronDown,
	Church,
	Search,
	Users
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { LiturgicalCalendarResponse } from '../../../interfaces/liturgicalCalendar/LiturgicalCalendarResponse';
import useLiturgicalCalendar from '../hooks/useLiturgicalCalender';
import EmptyState from './EmptyState';
import SectionTitle from './SectionTitle';
import usePresences from '../hooks/usePresences';
import MassCard from './MasCard';

function Presences() {
	const [selectedMassId, setSelectedMassId] = useState<number | null>(null);

	const { liturgicalCalendars, loading: loadingLiturgicalCalendar, error: errorLiturgicalCalendar } = useLiturgicalCalendar();
	const { masses, filter } = usePresences();

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

	function handleFilterMass(e: React.ChangeEvent<HTMLSelectElement>) {
		filter(e.target.value);
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
							onChange={(e) => handleFilterMass(e)}
						>
							<option hidden>Selecione uma Missa</option>
							{liturgicalCalendars.map((liturgicalCalendar: LiturgicalCalendarResponse) => (
								<option value={liturgicalCalendar.title}>{liturgicalCalendar.title}</option>
							))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-[18px] size-5 text-[var(--text-muted)]" />
          </div>
        </div>
      </section>
			
      <section className="mb-12">
        <SectionTitle icon={<Church className="size-5" />}>
          Missas encontradas
        </SectionTitle>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {masses.map(mass => (
						<MassCard
							mass={mass}
							selected={selectedMassId === mass.id}
							onSelect={() => setSelectedMassId(mass.id)}
						/>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="searchCatechumen"
            className="text-[0.9rem] font-bold uppercase tracking-wide text-[var(--text-main)]"
          >
            Pesquisar catequizando
          </label>

          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-[18px] size-[22px] text-[var(--text-muted)]" />

            <input
              id="searchCatechumen"
              type="text"
              placeholder="Digite o nome do catequizando..."
              className="w-full rounded-xl border-2 border-[#E2E8F0] bg-white py-4 pl-[52px] pr-4 text-[1.1rem] text-[var(--text-main)] transition-all duration-200 focus:border-[var(--primary)] focus:outline-none focus:shadow-[0_0_0_4px_rgba(245,158,11,0.15)]"
            />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <SectionTitle icon={<Users className="size-5" />}>
          Catequizandos presentes
        </SectionTitle>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* {catechumens.map((catechumen) => (
						<CardCatechumen catechumen={catechumen} placeAndTime='Missa' />
          ))} */}
        </div>
      </section>

			<EmptyState />
    </main>
  );
}

export default Presences;