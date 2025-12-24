// src/components/react/SpeedComparison.jsx
import { useState, useEffect } from 'react';
import { Zap, TurtleIcon as Turtle, Check, RefreshCw } from 'lucide-react';

export default function SpeedComparison() {
  const [slowProgress, setSlowProgress] = useState(0);
  const [fastProgress, setFastProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFastCheck, setShowFastCheck] = useState(false);
  const [showSlowCheck, setShowSlowCheck] = useState(false);

  const startComparison = () => {
    setSlowProgress(0);
    setFastProgress(0);
    setShowFastCheck(false);
    setShowSlowCheck(false);
    setIsAnimating(true);

    // Barra rápida - 1.2s
    const fastInterval = setInterval(() => {
      setFastProgress((prev) => {
        if (prev >= 100) {
          clearInterval(fastInterval);
          setShowFastCheck(true);
          return 100;
        }
        return prev + 0.833;
      });
    }, 10);

    // Barra lenta (competencia) - 8s
    const slowInterval = setInterval(() => {
      setSlowProgress((prev) => {
        if (prev >= 100) {
          clearInterval(slowInterval);
          setShowSlowCheck(true);
          setIsAnimating(false);
          return 100;
        }
        return prev + 0.125;
      });
    }, 10);
  };

  useEffect(() => {
    const timer = setTimeout(() => startComparison(), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      {/* Header compacto */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-2 border border-white/20">
          <span className="text-xs font-medium text-blue-100">Comparación en tiempo real</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-1">
          Tu web vs. La competencia
        </h3>
        <p className="text-blue-200 text-xs">
          Observa la diferencia de velocidad en acción
        </p>
      </div>

      {/* Comparación Visual */}
      <div className="space-y-3">
        {/* Barra Rápida (Tu nueva web) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-linear-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="font-bold text-white text-sm block leading-none">Tu nueva web</span>
                <span className="text-[10px] text-green-300">Sistema optimizado</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-mono font-bold text-green-300 block leading-none">
                {(fastProgress * 0.012).toFixed(2)}s
              </span>
              <span className="text-[10px] text-green-400">Target: 1.20s</span>
            </div>
          </div>
          <div className="relative h-8 bg-white/5 rounded-lg overflow-hidden backdrop-blur-sm border border-white/10">
            <div
              className="h-full bg-linear-to-r from-green-400 to-emerald-500 transition-all duration-100 ease-out relative"
              style={{ width: `${fastProgress}%` }}
            >
              {showFastCheck && (
                <div className="absolute inset-0 flex items-center justify-end pr-2 animate-fade-in">
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    <span className="text-white font-bold text-xs">Completado</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* VS Divider compacto */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-slate-800 px-2 text-xs font-bold text-white/60">VS</span>
          </div>
        </div>

        {/* Barra Lenta (Competencia) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-linear-to-br from-red-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Turtle className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="font-bold text-white text-sm block leading-none">Competencia típica</span>
                <span className="text-[10px] text-red-300">WordPress tradicional</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-mono font-bold text-red-300 block leading-none">
                {(slowProgress * 0.08).toFixed(2)}s
              </span>
              <span className="text-[10px] text-red-400">~8.20s promedio</span>
            </div>
          </div>
          <div className="relative h-8 bg-white/5 rounded-lg overflow-hidden backdrop-blur-sm border border-white/10">
            <div
              className="h-full bg-linear-to-r from-red-400 to-orange-500 transition-all duration-100 ease-out relative"
              style={{ width: `${slowProgress}%` }}
            >
              {showSlowCheck && (
                <div className="absolute inset-0 flex items-center justify-end pr-2 animate-fade-in">
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    <span className="text-white font-bold text-xs">Completado</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botón para repetir - compacto */}
      <button
        onClick={startComparison}
        disabled={isAnimating}
        className="group w-full px-4 py-2.5 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all backdrop-blur-sm border border-white/20 hover:border-white/30 disabled:border-white/10 flex items-center justify-center gap-2 text-sm"
      >
        <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
        <span>{isAnimating ? 'Comparando...' : 'Repetir comparación'}</span>
      </button>

      {/* Stats Grid compacto */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
        <div className="text-center p-2.5 rounded-lg bg-linear-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
          <div className="text-2xl font-bold text-green-300 mb-0.5">7x</div>
          <div className="text-[10px] text-green-200/80 font-medium">Más rápida</div>
        </div>
        <div className="text-center p-2.5 rounded-lg bg-linear-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
          <div className="text-2xl font-bold text-yellow-300 mb-0.5">-53%</div>
          <div className="text-[10px] text-yellow-200/80 font-medium">Rebote móvil</div>
        </div>
        <div className="text-center p-2.5 rounded-lg bg-linear-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
          <div className="text-2xl font-bold text-blue-300 mb-0.5">6.8s</div>
          <div className="text-[10px] text-blue-200/80 font-medium">Ahorrados</div>
        </div>
      </div>
    </div>
  );
}