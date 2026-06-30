import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import RouteForm from './components/RouteForm.jsx'
import MapView from './components/MapView.jsx'
import MedicalIllustration from './components/MedicalIllustration.jsx'

function extractErrorMessage(data) {
  if (data?.erro) return data.erro
  if (Array.isArray(data?.detail)) return data.detail.map(e => e.msg).join('; ')
  if (typeof data?.detail === 'string') return data.detail
  return 'Erro ao calcular rota. Verifique os parâmetros e tente novamente.'
}

export default function App() {
  const [geoJson, setGeoJson] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/rotas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(extractErrorMessage(data))
      setGeoJson(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setGeoJson(null)
    setError(null)
  }

  const cityCount = geoJson?.features?.length ?? 0

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <header className="h-11 bg-white border-b border-slate-200 flex items-center justify-between px-5 flex-shrink-0 z-10 shadow-sm">
          <span className="text-sm text-slate-500">
            {geoJson
              ? `✅ Rota calculada — ${cityCount} cidade${cityCount !== 1 ? 's' : ''}`
              : 'Configure e gere sua rota otimizada'}
          </span>
          <div className="flex items-center gap-3">
            <button className="text-xs text-blue-600 border border-blue-200 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors font-medium">
              💡 Dicas de como descrever sua rota
            </button>
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              G
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Form panel — fixed width, scrollable */}
          <div className="w-[360px] flex-shrink-0 overflow-y-auto border-r border-slate-200 bg-white shadow-sm">
            <RouteForm
              onSubmit={handleSubmit}
              onClear={handleClear}
              loading={loading}
              error={error}
            />
          </div>

          {/* Map / Illustration panel — takes all remaining space */}
          <div className="flex-1 relative overflow-hidden">
            {loading && (
              <div className="absolute inset-0 bg-blue-50/90 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-blue-700 font-semibold text-sm">Calculando rota otimizada...</p>
                <p className="text-blue-400 text-xs mt-1">O algoritmo genético está em execução</p>
              </div>
            )}
            {geoJson ? <MapView geoJson={geoJson} /> : <MedicalIllustration />}
          </div>
        </div>
      </div>
    </div>
  )
}
