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
		catechists,
		fullName,
		search,
		catechistId,
		filterByCatechist,
		isLoadingCatechists,
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
							catechistId={catechistId}
							filterByCatechist={filterByCatechist}
							catechists={catechists}
							isLoadingCatechists={isLoadingCatechists}
						/>
			}
		</div>
	)
}

export default Catechumens;