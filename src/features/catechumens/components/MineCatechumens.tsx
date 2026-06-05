import TopProgressBar from '../../../components/feedback/TopProgressBar';
import type { CatechumenPage } from '../../../data/catechumen/CatechumenPage';
import type { StepResponse } from '../../../data/step/StepResponse';
import type { GeneralDataType } from '../hooks/useCatechumens';
import Apresentation from './Apresentation';
import GeneralData from './GeneralData';
import ListCatechumens from './ListCatechumens';
import SearchCatechumen from './Search';

type MineCatechumensProps = {
  pageable: CatechumenPage,
  selectPage: (page: number) => void,
	nextPage: () => void,
	previousPage: () => void,
  steps: StepResponse[] | undefined,
  generalData: GeneralDataType | null,
  isLoading: boolean,
  fullName: string,
  search: (value: string) => void
}

function MineCatechumens({
  pageable,
  selectPage,
  nextPage,
  previousPage,
  steps,
  generalData,
  isLoading,
  fullName,
  search
}: MineCatechumensProps) {
  if (!generalData) return;
  if (!steps) return;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased text-left">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && (
          <TopProgressBar />
        )}

        <Apresentation
          title='Meus Catequizandos'
          description='Acompanhe a frequência detalhada e a participação dos seus catequizandos nas missas.'
          stepName={steps[0].stepName}
        />

        <GeneralData
          totalCatechumens={generalData.totalCatechumens}
          mediumFrequency={generalData.mediumFrequency}
          attention={generalData.attention}
          totalMasses={generalData.totalMasses}
          massesOccurred={generalData.massesOccurred}
        />

        <SearchCatechumen
          fullName={fullName}
          search={search}
        />
        
        <ListCatechumens
          pageable={pageable}
          selectPage={selectPage}
					nextPage={nextPage}
					previousPage={previousPage}
          isLoading={isLoading}
          clearSearch={search}
        />     
      </main>
    </div>
  );
}

export default MineCatechumens;