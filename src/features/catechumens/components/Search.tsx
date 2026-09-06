import { ChevronDown, Search, Users } from 'lucide-react';
import type { CatechistResponse } from '../../../data/catechist/CatechistResponse';

type SearchCatechumenProps = {
	fullName: string,
	search: (value: string) => void,
	catechists?: CatechistResponse[],
	isLoading?: boolean,
	catechistId?: number | null,
	filterByCatechist?: (catechistId: number | null) => void
}

function SearchCatechumen({
	fullName,
	search,
	catechists,
	isLoading,
	catechistId,
	filterByCatechist,
}: SearchCatechumenProps) {
	return (
		<section className="mb-8">
			<div className="flex flex-col sm:flex-row gap-3 w-full">

				{/* Barra de pesquisa */}
				<div className="relative flex-1">
					<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
						<Search className="h-5 w-5 text-slate-400" />
					</div>
					<input
						type="text"
						id='fullName'
						name='fullName'
						value={fullName}
						onChange={(e) => search(e.target.value)}
						className="block w-full h-14 pl-12 pr-4 text-base bg-white border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all shadow-sm"
						placeholder="Pesquisar catequizando pelo nome..."
					/>
				</div>

				{/* Filtro por catequista */}
				{filterByCatechist && (
					<div className="relative w-full sm:w-72 shrink-0">
						{/* <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<Users className="h-5 w-5 text-slate-400" />
						</div> */}
						<select
							id='catechistId'
							name='catechistId'
							value={catechistId ?? ''}
							onChange={(e) => filterByCatechist(e.target.value ? Number(e.target.value) : null)}
							disabled={isLoading}
							className="appearance-none cursor-pointer block w-full h-14 pl-12 pr-10 text-base bg-white border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
						>
							<option value="">Todos Catequistas</option>
							{(catechists ?? []).map((catechist) => (
								<option key={catechist.id} value={catechist.id}>
									{catechist.firstName} {catechist.lastName}
								</option>
							))}
						</select>
						<div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
							<ChevronDown className="h-4 w-4 text-slate-400" />
						</div>
					</div>
				)}
			</div>
		</section>
	)
}

export default SearchCatechumen;