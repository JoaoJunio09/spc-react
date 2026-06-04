import { useEffect } from 'react';
import useCatechumens from '../hooks/useCatechumens';
import useFilter from '../hooks/useFilter';
import useLoadSelectFilter from '../hooks/useLoadSelectFilter';
import '../styles/catechumens.css';
import AllCatechumens from './AllCatechumens';
import MineCatechumens from './MineCatechumens';

type CatechumensScope = {
	scope: 'mine' | 'all'
}

function Catechumens({ scope }: CatechumensScope) {
	const { steps, error: errorFilter } = useLoadSelectFilter();
	const {
		setStepId,
		setCatechistId,
		catechumens,
		loading,
		error
	} = useFilter();
	const {
		generalData,
		loadCatechist,
		catechumens: mineCatechumens,
		search,
		errorCatechumens,
		isLoadingCatechumens,
		isFetchingCatechumens,
} = useCatechumens();

	function handleFilter(e: React.ChangeEvent<HTMLSelectElement>) {
		const value = e.target.value.split('-');
		
		const stepId = value[0];
		const catechistId = value[1];

		setStepId(Number(stepId));
		setCatechistId(Number(catechistId));
	}

	useEffect(() => {
		if (scope === 'mine') {
			loadCatechist();
		}
	}, []);

	return (
		<div>
			{
				scope === 'mine'
					? <MineCatechumens
							catechumens={mineCatechumens}
							generalData={generalData}
							isLoading={isLoadingCatechumens}
						/>
					: <AllCatechumens steps={steps} catechumens={catechumens} handleFilter={handleFilter} />
			}
		</div>
	)
}

export default Catechumens;