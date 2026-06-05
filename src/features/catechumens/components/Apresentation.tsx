import { BookOpen } from "lucide-react";
import { FormatStep } from "../../../utils/FormatStep";

type ApresentationProps = {
	title: string,
	description: string,
  stepName: string | undefined
}

function Apresentation({
	title,
	description,
	stepName
}: ApresentationProps) {
  return (
    <div className="mb-8 md:flex md:items-center md:justify-between">
      <div className="max-w-xl flex flex-col items-center md:items-start">
        <h1 className="mb-2 text-2xl md:mb-0 sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
					{title}
        </h1>
        <p className="mt-1.5 max-md:text-center text-sm sm:text-base text-slate-500 font-medium">
					{description}
        </p>
      </div>
      {stepName && (
				<div className="mt-5 md:mt-0 flex items-center gap-2 text-slate-500 bg-slate-100/80 px-3.5 py-1.5 rounded-xl border border-slate-200">
					<BookOpen className="w-4 h-4 text-amber-600" />
					<span className="text-xs sm:text-sm font-semibold text-slate-700">
						Turma • {FormatStep.format(stepName)} 
					</span>
				</div>
			)}
    </div>
  )
}

export default Apresentation;