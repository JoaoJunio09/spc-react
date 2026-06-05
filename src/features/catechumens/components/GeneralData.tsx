import { AlertTriangle, Church, Percent, Users } from "lucide-react";
import type { GeneralDataType } from "../hooks/useCatechumens";

type GeneralDataCardProps = {
  icon: React.ReactNode,
  title: string,
  data: number | undefined,
  type: 'total_catechumens' | 'frequency' | 'warning' | 'total_masses' | 'masses_occurred'
}

const GeneralDataCard = ({
  icon,
  title,
  data,
  type
}: GeneralDataCardProps) => {

  function getColorForType() {
    if (type === 'total_catechumens') {
      return 'text-amber-600';
    } else if (type === 'frequency') {
      return 'text-emerald-600';
    } else if (type === 'warning') {
      return 'text-orange-600'
    } else {
      return 'text-slate-500 bg-slate-200/50';
    }
  }

  return (
    <div
      className={`
        rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:border-slate-300 col-span-1
        ${type === 'total_masses' || type === 'masses_occurred' ? 'bg-slate-100/50' : 'bg-white'}
      `}
    >
      <div className={`w-12 h-12 rounded-xl bg-amber-50  flex items-center justify-center flex-shrink-0 ${getColorForType()}`}>
        {icon}
      </div>
      
      <div>
        <span
          className={`
            block font-bold text-slate-400 uppercase tracking-wider
            ${type === 'total_masses' || type === 'masses_occurred' ? 'text-[0.68rem]' : 'text-xs'}
          `}
        >
          {title}
        </span>
        <span
          className={`
            sm:text-2xl font-black text-slate-800 mt-0.5 block
            ${type === 'total_masses' || type === 'masses_occurred' ? 'text-xl font-extrabold' : 'text-2xl'}
          `}
        >
          {type === 'frequency' ? `${data?.toFixed(1)}%` : data}
        </span>
      </div>
    </div>
  )
}

function GeneralData({
  totalCatechumens,
  mediumFrequency,
  attention,
  totalMasses,
  massesOccurred
}: GeneralDataType) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-4 mb-10">
      {/* Card Principal 1: Total de Catequizandos */}
      <GeneralDataCard
        icon={<Users className="w-6 h-6" />}
        title='Total de Catequizandos'
        data={totalCatechumens}
        type='total_catechumens'
      />

      {/* Card Principal 2: Frequência Média */}
      <GeneralDataCard
        icon={<Percent className="w-6 h-6" />}
        title='Frequência Média'
        data={mediumFrequency}
        type='frequency'
      />

      {/* Card Principal 3: Em Atenção */}
      <GeneralDataCard
        icon={<AlertTriangle className="w-6 h-6" />}
        title='Em Atenção'
        data={attention}
        type='warning'
      />

      {/* Card Complementar 4: Total de Missas do Ano (Subtil) */}
      <GeneralDataCard
        icon={<Church className="w-6 h-6" />}
        title='Total de Missas'
        data={totalMasses}
        type='total_masses'
      />
      

      {/* Card Complementar 5: Missas Já Ocorridas (Subtil) */}
      <GeneralDataCard
        icon={<Church className="w-6 h-6" />}
        title='Missas Ocorridas'
        data={massesOccurred}
        type='masses_occurred'
      />
    </section>
  )
}

export default GeneralData;