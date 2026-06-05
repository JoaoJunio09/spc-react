import TopProgressBar from "../../../components/feedback/TopProgressBar";
import type { CatechumenPage } from "../../../data/catechumen/CatechumenPage";
import type { GeneralDataType } from "../hooks/useCatechumens";
import Apresentation from "./Apresentation";
import GeneralData from "./GeneralData";
import ListCatechumens from "./ListCatechumens";
import SearchCatechumen from "./Search";

type AllCatechumensProps = {
	pageable: CatechumenPage,
	selectPage: (page: number) => void,
	nextPage: () => void,
	previousPage: () => void,
	generalData: GeneralDataType | null,
	isLoading: boolean,
	fullName: string,
	search: (value: string) => void
}

function AllCatechumens({
	pageable,
	selectPage,
	nextPage,
	previousPage,
	generalData,
	isLoading,
	fullName,
	search
}: AllCatechumensProps) {
	if (!generalData) return;
	return (
		<div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased text-left">
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{isLoading && (
					<TopProgressBar />
				)}
				
				<Apresentation
          title='Catequizandos da Paróquia'
          description='Acompanhe a frequência detalhada e a participação de todos os catequizandos nas missas.'
          stepName={undefined}
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
	)
}

export default AllCatechumens;