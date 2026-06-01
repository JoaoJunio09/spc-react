import { useEffect } from 'react';
import { toast } from 'react-toastify';
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

	function handleFilter(e: React.ChangeEvent<HTMLSelectElement>) {
		const value = e.target.value.split('-');
		
		const stepId = value[0];
		const catechistId = value[1];

		setStepId(Number(stepId));
		setCatechistId(Number(catechistId));
	}

	useEffect(() => {
		if (loading) {
			toast.loading('Carregando');
		} else {
			toast.dismiss();
		}

		if (error) {
			toast.error(error);
		}

		if (errorFilter) {
			toast.error(errorFilter);
		}
	}, [errorFilter, error, loading]);

	return (
		<div>
			{
				scope === 'mine'
					? <MineCatechumens />
					: <AllCatechumens steps={steps} catechumens={catechumens} handleFilter={handleFilter} />
			}
		</div>
	)
}

export default Catechumens;