// src/components/react/BeforeAfterSlider.jsx
import { 
  ReactCompareSlider, 
  ReactCompareSliderImage 
} from 'react-compare-slider';

export default function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  alt = "Antes y después de la reforma" 
}) {
  return (
    <div className="relative">
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage 
            src={beforeImage} 
            alt={`${alt} - Antes`}
            style={{ filter: 'grayscale(20%)' }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage 
            src={afterImage} 
            alt={`${alt} - Después`}
          />
        }
        position={50}
        style={{
          height: '400px',
          width: '100%',
        }}
        className="cursor-col-resize"
      />
      
      {/* Etiquetas "Antes" y "Después" */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
        ANTES
      </div>
      <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
        DESPUÉS
      </div>
      
      {/* Indicador de interacción */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-slate-900 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 pointer-events-none">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
        Desliza para comparar
      </div>
    </div>
  );
}