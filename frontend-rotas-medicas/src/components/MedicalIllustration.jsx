export default function MedicalIllustration() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* SVG ilustração compacta */}
      <div className="flex flex-col items-center gap-2">
        <svg
          width="220"
          height="190"
          viewBox="0 0 220 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Background */}
          <ellipse cx="110" cy="96" rx="100" ry="87" fill="#EEF4FF" />

          {/* Grid lines */}
          {[40, 80, 120, 160].map(y => (
            <line key={`h${y}`} x1="15" y1={y} x2="205" y2={y}
              stroke="#C7D8F7" strokeWidth="0.8" strokeDasharray="4 4" />
          ))}
          {[55, 110, 165].map(x => (
            <line key={`v${x}`} x1={x} y1="10" x2={x} y2="180"
              stroke="#C7D8F7" strokeWidth="0.8" strokeDasharray="4 4" />
          ))}

          {/* Route line (loop) */}
          <polyline
            points="55,155 55,50 110,35 165,80 165,155 110,155 55,155"
            fill="none"
            stroke="#1D6AE8"
            strokeWidth="2.2"
            strokeDasharray="7 4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
          />

          {/* Arrow heads */}
          <polygon points="55,76 49,90 61,90" fill="#1D6AE8" opacity="0.6" />
          <polygon points="140,38 148,50 152,37" fill="#1D6AE8" opacity="0.6" />

          {/* City 1 — partida */}
          <circle cx="55" cy="155" r="19" fill="white" stroke="#1D6AE8" strokeWidth="2" />
          <circle cx="55" cy="155" r="15" fill="#1D6AE8" />
          <text x="55" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">1</text>

          {/* City 2 */}
          <circle cx="110" cy="35" r="19" fill="white" stroke="#EF4444" strokeWidth="2" />
          <circle cx="110" cy="35" r="15" fill="#EF4444" />
          <text x="110" y="40" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">2</text>

          {/* City 3 */}
          <circle cx="165" cy="80" r="19" fill="white" stroke="#1D6AE8" strokeWidth="2" />
          <circle cx="165" cy="80" r="15" fill="#1D6AE8" />
          <text x="165" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">3</text>

          {/* City 4 */}
          <circle cx="165" cy="155" r="19" fill="white" stroke="#EF4444" strokeWidth="2" />
          <circle cx="165" cy="155" r="15" fill="#EF4444" />
          <text x="165" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">4</text>

          {/* City 5 */}
          <circle cx="110" cy="155" r="19" fill="white" stroke="#1D6AE8" strokeWidth="2" />
          <circle cx="110" cy="155" r="15" fill="#1D6AE8" />
          <text x="110" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">5</text>

          {/* Medical cross (centro) */}
          <rect x="99" y="96" width="22" height="7" rx="2.5" fill="#10B981" />
          <rect x="106" y="89" width="7" height="22" rx="2.5" fill="#10B981" />

          {/* City labels */}
          <text x="55" y="181" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="Inter, sans-serif">Rio de Janeiro</text>
          <text x="110" y="14" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="Inter, sans-serif">Teresópolis</text>
          <text x="165" y="108" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="Inter, sans-serif">Petrópolis</text>
        </svg>

        {/* Caption */}
        <div className="text-center max-w-xs">
          <h3 className="text-base font-semibold text-slate-600">Pronto para otimizar</h3>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed">
            Descreva a rota no formulário ao lado e clique em <strong className="text-blue-500">Gerar Rota</strong>.
          </p>
        </div>
      </div>

      {/* Benefit cards */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
        {[
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D6AE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            ),
            title: 'Mais cobertura',
            desc: 'Visite mais profissionais no menor tempo possível.',
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D6AE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            ),
            title: 'Rotas inteligentes',
            desc: 'Algoritmos avançados para resultados otimizados.',
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D6AE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            ),
            title: 'Mais resultados',
            desc: 'Aumente o impacto da sua equipe médica.',
          },
        ].map(item => (
          <div
            key={item.title}
            className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 text-center"
          >
            <div className="flex justify-center mb-2">{item.icon}</div>
            <div className="text-[11px] font-semibold text-slate-700">{item.title}</div>
            <div className="text-[10px] text-slate-400 mt-1 leading-relaxed">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
