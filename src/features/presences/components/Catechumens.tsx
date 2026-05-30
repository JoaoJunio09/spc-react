import { Search, Users } from "lucide-react";
import type { PresenceResponse } from "../../../interfaces/presence/PresenceResponse";
import CatechumenCard from "./CatechumenCard";
import CatechumenCardSkeleton from "./CatechumenCardSkeleton";
import EmptyState from "./EmptyState";
import SectionTitle from "./SectionTitle";

type CatechumensProps = {
	presences: PresenceResponse[],
  onFilter: (param: string) => void,
  isLoading: boolean,
  isError: boolean
}

function Catechumens({
  presences,
  onFilter,
  isLoading,
  isError
}: CatechumensProps) {
	return (
		<div>
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
              onChange={(e) => onFilter(e.target.value)}
            />
          </div>
        </div>
      </section>

      {
        presences.length > 0
          ? <section className="mb-16">
              <div className="flex flex-row flex-wrap justify-between">
                <SectionTitle icon={<Users className="size-5" />}>
                  Catequizandos presentes
                </SectionTitle>

                <SectionTitle>
                  Total: {presences.length}
                </SectionTitle>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {
                  isLoading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <CatechumenCardSkeleton key={index} />
                      ))
                    : presences.map((presence) => (
                        <CatechumenCard key={presence.id} presence={presence} />
                      ))
                }
              </div>
            </section>
          : <EmptyState />
      }

    </div>
	)
}

export default Catechumens;