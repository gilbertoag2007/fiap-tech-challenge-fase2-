import { useState } from 'react'

const DEFAULTS = {
  mensagem: '',
  epocas: 100,
  tamanho_populacao: 200,
  tamanho_elite: 20,
  grau_mutacao: 1.0,
  elitismo: 1,
  populacao_apenas_aleatoria: 0,
}

function NumberInput({ label, field, form, onChange, min, max, step = 1, placeholder }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </label>
      <input
        type="number"
        value={form[field]}
        onChange={e => onChange(field, e.target.value)}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        required
        className="w-full text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-slate-700 bg-slate-50 transition-all"
      />
    </div>
  )
}

export default function RouteForm({ onSubmit, onClear, loading, error }) {
  const [form, setForm] = useState(DEFAULTS)

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleMethodChange = (isElitismo) => {
    setForm(prev => ({
      ...prev,
      elitismo: isElitismo ? 1 : 0,
      populacao_apenas_aleatoria: isElitismo ? 0 : 1,
    }))
  }

  const handleClear = () => {
    setForm(DEFAULTS)
    onClear()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      mensagem: form.mensagem,
      epocas: parseInt(form.epocas),
      tamanho_populacao: parseInt(form.tamanho_populacao),
      tamanho_elite: parseInt(form.tamanho_elite),
      grau_mutacao: parseFloat(form.grau_mutacao),
      elitismo: form.elitismo,
      populacao_apenas_aleatoria: form.populacao_apenas_aleatoria,
    })
  }

  const charCount = form.mensagem.length

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="pb-3 border-b border-slate-100">
        <h1 className="text-lg font-bold text-slate-800">Criar Nova Rota</h1>
        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
          Informe em linguagem natural quais cidades e produtos devem fazer parte da rota e deixe o sistema otimizar para você.
        </p>
      </div>

      {/* Mensagem */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1D6AE8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-slate-700">Descreva sua rota</span>
        </div>
        <p className="text-[11px] text-slate-400 mb-1.5">
          Informe em linguagem natural as cidades e os produtos que devem fazer parte da rota.
        </p>
        <textarea
          value={form.mensagem}
          onChange={e => handleChange('mensagem', e.target.value)}
          placeholder="Ex.: Monte uma rota saindo do Rio de Janeiro para entregar vacinas da Covid 19 nas cidades da baixada fluminense e região serrana do estado do Rio de Janeiro."
          rows={4}
          minLength={20}
          maxLength={500}
          required
          className="w-full text-sm border border-slate-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-slate-700 placeholder-slate-300 bg-slate-50 transition-all leading-relaxed"
        />
        <div className={`text-right text-[10px] mt-0.5 ${charCount > 450 ? 'text-orange-500' : 'text-slate-300'}`}>
          {charCount} / 500
        </div>
      </div>

      {/* Algoritmos Genéticos */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-3 py-2 border-b border-slate-200 flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1D6AE8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
          </svg>
          <span className="text-xs font-bold text-slate-700 tracking-wide">ALGORITMOS GENÉTICOS</span>
        </div>

        <div className="p-3 flex flex-col gap-3">
          {/* Row 1: épocas, população, melhores */}
          <div className="grid grid-cols-3 gap-2">
            <NumberInput label="Épocas" field="epocas" form={form} onChange={handleChange} min={1} max={100000} placeholder="100" />
            <NumberInput label="População" field="tamanho_populacao" form={form} onChange={handleChange} min={2} max={10000} placeholder="200" />
            <NumberInput label="Melhores" field="tamanho_elite" form={form} onChange={handleChange} min={1} max={9999} placeholder="20" />
          </div>

          {/* Grau de mutação */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                Grau de Mutação
              </label>
              <span className="text-xs font-bold text-blue-600 tabular-nums">
                {parseFloat(form.grau_mutacao).toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={10}
              step={0.1}
              value={form.grau_mutacao}
              onChange={e => handleChange('grau_mutacao', e.target.value)}
              className="w-full h-1.5 accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-300 mt-0.5">
              <span>0%</span>
              <span>5%</span>
              <span>10%</span>
            </div>
          </div>

          {/* Método */}
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5 block">
              Método de Otimização
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  isElitismo: true,
                  label: 'Usar Elitismo',
                  desc: 'Preserva os melhores indivíduos para garantir evolução contínua.',
                  badge: 'Recomendado',
                },
                {
                  isElitismo: false,
                  label: 'Apenas Aleatório',
                  desc: 'Gera novas soluções apenas com base na aleatoriedade.',
                },
              ].map(opt => {
                const selected = opt.isElitismo ? form.elitismo === 1 : form.elitismo === 0
                return (
                  <button
                    key={String(opt.isElitismo)}
                    type="button"
                    onClick={() => handleMethodChange(opt.isElitismo)}
                    className={`text-left p-2.5 rounded-xl border-2 transition-all ${
                      selected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-1.5 mb-1">
                      <div
                        className={`w-3 h-3 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors ${
                          selected ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="text-[11px] font-semibold text-slate-700 leading-tight">{opt.label}</span>
                          {opt.badge && (
                            <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded font-semibold">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed pl-4">{opt.desc}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
          <span className="text-red-500 flex-shrink-0 mt-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </span>
          <p className="text-sm text-red-700 leading-snug">{error}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleClear}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors disabled:opacity-40"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
          Limpar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm rounded-xl transition-colors shadow-md shadow-blue-200"
        >
          {loading ? (
            <>
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              Calculando...
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11"/>
              </svg>
              Gerar Rota
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
