import { useEffect, useRef } from 'react'
import L from 'leaflet'

export default function MapView({ geoJson }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const layersRef = useRef([])

  /* Inicializa o mapa uma única vez */
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    mapRef.current = L.map(containerRef.current, {
      center: [-15.8, -47.9],
      zoom: 5,
      zoomControl: true,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(mapRef.current)

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  /* Redesenha marcadores e polilinha quando geoJson muda */
  useEffect(() => {
    const map = mapRef.current
    if (!map || !geoJson?.features) return

    layersRef.current.forEach(l => map.removeLayer(l))
    layersRef.current = []

    const features = [...geoJson.features].sort(
      (a, b) =>
        parseInt(a.properties.ordem_visita) - parseInt(b.properties.ordem_visita)
    )

    const latLngs = []

    features.forEach(feature => {
      const [lon, lat] = feature.geometry.coordinates
      const { ordem_visita, cidade, uf, produto, prioridade } = feature.properties
      const isHighPriority = prioridade === '1'
      const color = isHighPriority ? '#ef4444' : '#1d6ae8'

      latLngs.push([lat, lon])

      const icon = L.divIcon({
        className: '',
        html: `<div style="
          background:${color};
          color:white;
          width:28px;height:28px;
          border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          font-weight:700;font-size:11px;
          border:2.5px solid white;
          box-shadow:0 2px 8px rgba(0,0,0,0.25);
          font-family:Inter,system-ui,sans-serif;
          letter-spacing:-0.5px;
        ">${ordem_visita}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -18],
      })

      const marker = L.marker([lat, lon], { icon })
      marker.bindPopup(
        `<div style="font-family:Inter,system-ui,sans-serif;min-width:170px;padding:2px 0;">
          <div style="font-weight:700;font-size:13px;color:#1a2d4f;margin-bottom:5px;line-height:1.3;">
            ${ordem_visita}. ${cidade} <span style="color:#94a3b8;font-weight:500;">/ ${uf}</span>
          </div>
          ${produto
            ? `<div style="font-size:11px;color:#64748b;margin-bottom:3px;">📦 ${produto}</div>`
            : ''}
          <div style="font-size:11px;font-weight:600;color:${color};">
            ${isHighPriority ? '🔴 Alta prioridade' : '🔵 Baixa prioridade'}
          </div>
        </div>`,
        { maxWidth: 220 }
      )
      marker.addTo(map)
      layersRef.current.push(marker)
    })

    /* Fecha o loop da rota */
    if (latLngs.length > 1) latLngs.push(latLngs[0])

    const polyline = L.polyline(latLngs, {
      color: '#1d6ae8',
      weight: 2.5,
      opacity: 0.7,
      dashArray: '7 5',
      lineJoin: 'round',
    }).addTo(map)
    layersRef.current.push(polyline)

    if (latLngs.length > 0) {
      map.fitBounds(L.latLngBounds(latLngs), { padding: [55, 55], maxZoom: 13 })
    }

    setTimeout(() => map.invalidateSize(), 80)
  }, [geoJson])

  const featureCount = geoJson?.features?.length ?? 0

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="w-full h-full" />

      {/* Legenda */}
      {featureCount > 0 && (
        <div className="absolute bottom-5 left-4 bg-white rounded-2xl shadow-xl p-3.5 text-xs z-[1000] border border-slate-100">
          <p className="font-bold text-slate-700 mb-2 text-[11px] uppercase tracking-wide">Legenda</p>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500 flex-shrink-0 shadow-sm" />
            <span className="text-slate-500">Alta prioridade (vacinas)</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3.5 h-3.5 rounded-full bg-blue-600 flex-shrink-0 shadow-sm" />
            <span className="text-slate-500">Baixa prioridade (insumos)</span>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <div
              className="h-0"
              style={{ width: 28, borderTop: '2px dashed #1d6ae8' }}
            />
            <span className="text-slate-400">Rota otimizada</span>
          </div>
          <p className="text-slate-400 mt-2 pt-2 border-t border-slate-100">
            <strong className="text-slate-600">{featureCount}</strong> cidade{featureCount !== 1 ? 's' : ''} na rota
          </p>
        </div>
      )}
    </div>
  )
}
