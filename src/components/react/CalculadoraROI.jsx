// src/components/react/CalculadoraROI.jsx
import { useState } from 'react';
import { TrendingUp, Clock, Euro, AlertTriangle, Mail, CheckCircle, ArrowRight, Calculator, Target, Zap, Calendar } from 'lucide-react';

export default function CalculadoraROI() {
  const [formData, setFormData] = useState({
    obrasAlMes: 3,
    ticketMedio: 45000,
    visitasInutiles: 5,
    horasPorVisita: 2,
    costoHora: 50,
  });
  
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);

  // Cálculos
  const tiempoPerdidoMes = formData.visitasInutiles * formData.horasPorVisita;
  const costeTiempoMes = tiempoPerdidoMes * formData.costoHora;
  const costeTiempoAnual = costeTiempoMes * 12;
  
  const leadsMarketplace = formData.obrasAlMes * 40;
  const costoMarketplaceAnual = leadsMarketplace * 12;
  
  const ahorroAnual = costeTiempoAnual + costoMarketplaceAnual;
  const inversionWeb = 2500;
  const mantenimientoAnual = 120 * 12;
  const costoTotalWeb = inversionWeb + mantenimientoAnual;
  
  const retornoNeto = ahorroAnual - costoTotalWeb;
  const roi = ((retornoNeto / costoTotalWeb) * 100).toFixed(0);

  const handleCalculate = () => {
    setShowEmailForm(true);
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    console.log('Lead capturado:', { email, ...formData, roi });
    setShowResults(true);
    setShowEmailForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!showResults && !showEmailForm && (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
          {/* Header compacto */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="w-5 h-5 text-white" />
              <h2 className="text-xl font-bold text-white">Calculadora de ROI</h2>
            </div>
            <p className="text-blue-100 text-xs">
              Descubre cuánto dinero pierdes sin un sistema de filtrado
            </p>
          </div>

          <div className="p-5 space-y-4">
            {/* Grid 2x2 para los inputs */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Obras al mes */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100">
                <div className="flex items-center gap-1.5 mb-2">
                  <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                  <label className="text-xs font-semibold text-slate-700">
                    Obras al mes
                  </label>
                </div>
                <div className="text-center mb-2">
                  <span className="text-3xl font-bold text-green-600">{formData.obrasAlMes}</span>
                  <span className="text-sm text-green-600 ml-1">obras</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={formData.obrasAlMes}
                  onChange={(e) => setFormData({ ...formData, obrasAlMes: Number(e.target.value) })}
                  className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer slider-thumb-green"
                  style={{
                    background: `linear-gradient(to right, #10B981 0%, #10B981 ${((formData.obrasAlMes - 1) / 14) * 100}%, #E2E8F0 ${((formData.obrasAlMes - 1) / 14) * 100}%, #E2E8F0 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
                  <span>1</span>
                  <span>15</span>
                </div>
              </div>

              {/* Ticket medio */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
                <div className="flex items-center gap-1.5 mb-2">
                  <Euro className="w-3.5 h-3.5 text-blue-600" />
                  <label className="text-xs font-semibold text-slate-700">
                    Ticket medio
                  </label>
                </div>
                <div className="text-center mb-2">
                  <span className="text-3xl font-bold text-blue-600">
                    {(formData.ticketMedio / 1000).toFixed(0)}k€
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="150000"
                  step="5000"
                  value={formData.ticketMedio}
                  onChange={(e) => setFormData({ ...formData, ticketMedio: Number(e.target.value) })}
                  className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer slider-thumb-blue"
                  style={{
                    background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((formData.ticketMedio - 10000) / 140000) * 100}%, #E2E8F0 ${((formData.ticketMedio - 10000) / 140000) * 100}%, #E2E8F0 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
                  <span>10k</span>
                  <span>150k</span>
                </div>
              </div>

              {/* Visitas inútiles */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-3 border border-red-100">
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  <label className="text-xs font-semibold text-slate-700">
                    Visitas inútiles/mes
                  </label>
                </div>
                <div className="text-center mb-2">
                  <span className="text-3xl font-bold text-red-600">{formData.visitasInutiles}</span>
                  <span className="text-sm text-red-600 ml-1">visitas</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={formData.visitasInutiles}
                  onChange={(e) => setFormData({ ...formData, visitasInutiles: Number(e.target.value) })}
                  className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer slider-thumb-red"
                  style={{
                    background: `linear-gradient(to right, #EF4444 0%, #EF4444 ${(formData.visitasInutiles / 20) * 100}%, #E2E8F0 ${(formData.visitasInutiles / 20) * 100}%, #E2E8F0 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
                  <span>0</span>
                  <span>20</span>
                </div>
              </div>

              {/* Horas por visita */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
                <div className="flex items-center gap-1.5 mb-2">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  <label className="text-xs font-semibold text-slate-700">
                    Horas por visita
                  </label>
                </div>
                <div className="text-center mb-2">
                  <span className="text-3xl font-bold text-purple-600">{formData.horasPorVisita}</span>
                  <span className="text-sm text-purple-600 ml-1">h</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={formData.horasPorVisita}
                  onChange={(e) => setFormData({ ...formData, horasPorVisita: Number(e.target.value) })}
                  className="w-full h-1.5 bg-white rounded-lg appearance-none cursor-pointer slider-thumb-purple"
                  style={{
                    background: `linear-gradient(to right, #A855F7 0%, #A855F7 ${((formData.horasPorVisita - 0.5) / 4.5) * 100}%, #E2E8F0 ${((formData.horasPorVisita - 0.5) / 4.5) * 100}%, #E2E8F0 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
                  <span>0.5h</span>
                  <span>5h</span>
                </div>
              </div>
            </div>

            {/* Botón calcular */}
            <button
              onClick={handleCalculate}
              className="group w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center justify-center gap-2 text-sm"
            >
              <Target className="w-4 h-4" />
              <span>Calcular mi Ahorro Anual</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* Formulario de email (Lead Gate) */}
      {showEmailForm && (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 text-white text-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-1">¡Estás a un paso!</h3>
            <p className="text-green-100 text-xs">
              Introduce tu email para ver el cálculo completo
            </p>
          </div>
          
          <form onSubmit={handleSubmitEmail} className="p-5 space-y-3">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full pl-10 pr-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-sm"
              />
            </div>
            
            <button
              type="submit"
              className="group w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 text-sm"
            >
              <span>Ver mi ROI completo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>Sin spam. Solo información útil</span>
            </div>
          </form>
        </div>
      )}

      {/* Resultados */}
      {showResults && (
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header con ROI */}
          <div className="text-center px-6 py-4 border-b border-white/10">
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-0.5 rounded-full mb-2 border border-white/20">
              <Zap className="w-3 h-3 text-yellow-300" />
              <span className="text-[10px] font-medium text-white">Retorno de Inversión</span>
            </div>
            <div className="text-5xl font-bold text-white mb-1">+{roi}%</div>
            <p className="text-blue-200 text-xs">ROI Anual Estimado</p>
          </div>

          <div className="p-5 space-y-3">
            {/* Comparativa */}
            <div className="grid md:grid-cols-2 gap-3">
              {/* Pérdidas actuales */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-300" />
                  <div className="text-red-300 text-[10px] font-semibold">PÉRDIDAS ACTUALES</div>
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {ahorroAnual.toLocaleString('es-ES')}€
                  <span className="text-sm text-blue-200">/año</span>
                </div>
                <ul className="text-[10px] text-blue-100 space-y-0.5">
                  <li className="flex items-start gap-1.5">
                    <span className="text-red-300 mt-0.5">•</span>
                    <span>{costeTiempoAnual.toLocaleString('es-ES')}€ en visitas inútiles</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-red-300 mt-0.5">•</span>
                    <span>{costoMarketplaceAnual.toLocaleString('es-ES')}€ en marketplaces</span>
                  </li>
                </ul>
              </div>

              {/* Con nueva web */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="flex items-center gap-1.5 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <div className="text-green-300 text-[10px] font-semibold">CON TU NUEVA WEB</div>
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {retornoNeto.toLocaleString('es-ES')}€
                  <span className="text-sm text-blue-200">/año</span>
                </div>
                <ul className="text-[10px] text-blue-100 space-y-0.5">
                  <li className="flex items-start gap-1.5">
                    <span className="text-green-300 mt-0.5">•</span>
                    <span>Ahorro neto después de inversión</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-green-300 mt-0.5">•</span>
                    <span>Setup: {inversionWeb}€ + {mantenimientoAnual}€/año</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Insight clave */}
            <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-3.5 h-3.5 text-yellow-300" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-0.5 text-xs">Ahorro Real:</div>
                  <div className="text-[10px] text-blue-100">
                    Pierdes <strong className="text-yellow-300">{tiempoPerdidoMes}h/mes</strong> en visitas sin conversión. 
                    Son <strong className="text-yellow-300">{(tiempoPerdidoMes * 12).toFixed(0)}h anuales</strong> que podrías dedicar a cerrar más obras.
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-1">
              <a
                href="/contacto"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Solicitar Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}