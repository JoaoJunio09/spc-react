import {
  Search
} from 'lucide-react';

type SearchCatechumenProps = {
	fullName: string,
	search: (value: string) => void
}

function SearchCatechumen({
	fullName,
	search
}: SearchCatechumenProps) {
	return (
		<section className="mb-8">
			<div className="relative w-full">
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
		</section>
	)
}

export default SearchCatechumen;