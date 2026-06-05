import useCatechumens from '../hooks/useCatechumens';
import AllCatechumens from './AllCatechumens';
import MineCatechumens from './MineCatechumens';

type CatechumensScope = {
	scope: 'mine' | 'all'
}

function Catechumens({ scope }: CatechumensScope) {
	const {
		selectPage,
		nextPage,
		previousPage,
		generalDataMineCatechumens,
		generalDataAllCatechumens,
		mineCatechumens,
		allCatechumens,
		steps,
		fullName,
		search,
		isLoadingMineCatechumens,
		isLoadingAllCatechumens,
	} = useCatechumens(scope);

	return (
		<div>
			{
				scope === 'mine'
					? <MineCatechumens
							pageable={mineCatechumens}
							selectPage={selectPage}
							nextPage={nextPage}
							previousPage={previousPage}
							steps={steps}
							generalData={generalDataMineCatechumens}
							isLoading={isLoadingMineCatechumens}
							fullName={fullName}
							search={search}
						/>
					: <AllCatechumens
							pageable={allCatechumens}
							selectPage={selectPage}
							nextPage={nextPage}
							previousPage={previousPage}
							generalData={generalDataAllCatechumens}
							isLoading={isLoadingAllCatechumens}
							fullName={fullName}
							search={search}
						/>
			}
		</div>
	)
}

export default Catechumens;