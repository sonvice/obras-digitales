import { useEffect, useRef, useState } from 'react';

const MapaMadrid = ({ barrios = [], apiKey }) => {
  const mapRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Coordenadas aproximadas de los barrios de Madrid
  const coordenadasBarrios = {
    'salamanca': { lat: 40.4302, lng: -3.6777 },
    'chamartin': { lat: 40.4650, lng: -3.6777 },
    'chamberi': { lat: 40.4378, lng: -3.7038 },
    'retiro': { lat: 40.4153, lng: -3.6844 },
    'moncloa': { lat: 40.4378, lng: -3.7178 },
    'pozuelo': { lat: 40.4350, lng: -3.8120 },
    'las-rozas': { lat: 40.4928, lng: -3.8737 },
    'majadahonda': { lat: 40.4738, lng: -3.8719 },
    'tres-cantos': { lat: 40.6025, lng: -3.7100 },
    'alcobendas': { lat: 40.5478, lng: -3.6419 }
  };

  useEffect(() => {
    if (!apiKey) {
      setError('API Key de Google Maps no configurada');
      setLoading(false);
      return;
    }

    // Cargar Google Maps API
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      script.onerror = () => {
        setError('Error al cargar Google Maps');
        setLoading(false);
      };
      document.head.appendChild(script);
    };

    const initMap = () => {
      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 40.4168, lng: -3.7038 }, // Centro de Madrid
          zoom: 11,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });

        // Añadir marcadores para cada barrio
        barrios.forEach((barrio) => {
          const coords = coordenadasBarrios[barrio.slug];
          if (coords) {
            const marker = new window.google.maps.Marker({
              position: coords,
              map: map,
              title: barrio.nombre,
              animation: window.google.maps.Animation.DROP,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: barrio.demanda === 'muy-alta' ? '#DC2626' : 
                          barrio.demanda === 'alta' ? '#EA580C' :
                          barrio.demanda === 'media-alta' ? '#EAB308' : '#22C55E',
                fillOpacity: 0.8,
                strokeColor: '#ffffff',
                strokeWeight: 2,
                scale: 8,
              }
            });

            // InfoWindow para cada marcador
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="padding: 8px; max-width: 200px;">
                  <h3 style="font-weight: bold; margin: 0 0 8px 0; color: #1e293b;">${barrio.nombre}</h3>
                  <p style="margin: 4px 0; font-size: 14px; color: #64748b;">${barrio.zona}</p>
                  <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e2e8f0;">
                    <div style="font-size: 12px; color: #64748b;">Ticket medio</div>
                    <div style="font-weight: bold; color: #2563eb; font-size: 16px;">
                      ${Number(barrio.ticketMedio).toLocaleString('es-ES')}€
                    </div>
                  </div>
                  <a href="/reformas/${barrio.slug}" 
                     style="display: inline-block; margin-top: 12px; padding: 6px 12px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">
                    Ver detalles
                  </a>
                </div>
              `
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });
          }
        });

        setLoading(false);
      } catch (err) {
        setError('Error al inicializar el mapa');
        setLoading(false);
      }
    };

    loadGoogleMaps();
  }, [apiKey, barrios]);

  if (error) {
    return (
      <div className="bg-slate-100 rounded-2xl p-12 text-center">
        <svg className="w-24 h-24 mx-auto text-slate-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <div className="text-slate-600 mb-4">
          Mapa interactivo de Madrid
        </div>
        <p className="text-sm text-slate-500">
          {error} - Configura tu API Key de Google Maps
        </p>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ height: '500px' }}>
      {loading && (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Cargando mapa...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Leyenda */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 text-sm">
        <div className="font-semibold mb-2 text-slate-900">Demanda de reformas</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-600"></div>
            <span className="text-slate-700">Muy Alta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-600"></div>
            <span className="text-slate-700">Alta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="text-slate-700">Media-Alta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-slate-700">Media</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapaMadrid;