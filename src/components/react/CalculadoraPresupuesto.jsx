// src/components/react/CalculadoraPresupuesto.jsx
import { useState } from 'react';
import { Bath, ChefHat, Home, Sofa, ArrowRight, ArrowLeft, Mail, Check, Sparkles, Calendar } from 'lucide-react';

export default function CalculadoraPresupuesto() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tipo: '',
    metros: 50,
    calidad: '',
    email: '',
  });
  const [showResults, setShowResults] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tiposReforma = [
    { id: 'bano', nombre: 'Baño Completo', precio: 450, icon: Bath, gradient: 'from-blue-400 to-blue-600' },
    { id: 'cocina', nombre: 'Cocina Completa', precio: 650, icon: ChefHat, gradient: 'from-orange-400 to-orange-600' },
    { id: 'integral', nombre: 'Reforma Integral', precio: 800, icon: Home, gradient: 'from-purple-400 to-purple-600' },
    { id: 'salon', nombre: 'Salón/Comedor', precio: 350, icon: Sofa, gradient: 'from-green-400 to-green-600' },
  ];

  const calidades = [
    { 
      id: 'basica', 
      nombre: 'Básica', 
      multiplicador: 0.8,
      descripcion: 'Materiales estándar, funcional',
      badge: 'Económica',
      color: 'blue'
    },
    { 
      id: 'media', 
      nombre: 'Media', 
      multiplicador: 1.0,
      descripcion: 'Buenos materiales, buen acabado',
      badge: 'Recomendada',
      color: 'green'
    },
    { 
      id: 'premium', 
      nombre: 'Premium', 
      multiplicador: 1.4,
      descripcion: 'Materiales de lujo, diseño exclusivo',
      badge: 'Exclusiva',
      color: 'purple'
    },
  ];

  const calcularPresupuesto = () => {
    const tipo = tiposReforma.find(t => t.id === formData.tipo);
    const calidad = calidades.find(c => c.id === formData.calidad);
    
    if (!tipo || !calidad || !formData.metros) return { min: 0, max: 0 };
    
    const base = tipo.precio * formData.metros * calidad.multiplicador;
    const min = Math.round(base * 0.9);
    const max = Math.round(base * 1.15);
    
    return { min, max };
  };

  const handleNext = () => {
    if (step === 1 && !formData.tipo) return;
    if (step === 2 && formData.metros < 5) return;
    if (step === 3 && !formData.calidad) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      if (step === 3) {
        setStep(4);
      } else {
        setStep(step + 1);
      }
      setIsTransitioning(false);
    }, 150);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(step - 1);
      setIsTransitioning(false);
    }, 150);
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (!formData.email) return;
    
    console.log('Lead capturado:', formData);
    
    setIsTransitioning(true);
    setTimeout(() => {
      setShowResults(true);
      setIsTransitioning(false);
    }, 150);
  };

  const presupuesto = calcularPresupuesto();

  const handleReset = () => {
    setStep(1);
    setFormData({ tipo: '', metros: 50, calidad: '', email: '' });
    setShowResults(false);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps - Compacto */}
      {!showResults && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center flex-1 last:flex-none">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all
                  ${step >= num 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'bg-slate-200 text-slate-400'
                  }
                `}>
                  {step > num ? <Check className="w-4 h-4" /> : num}
                </div>
                {num < 4 && (
                  <div className={`
                    flex-1 h-0.5 mx-2 rounded-full transition-all
                    ${step > num ? 'bg-blue-600' : 'bg-slate-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-slate-600 px-1">
            <span className={step === 1 ? 'font-semibold text-blue-600' : ''}>Tipo</span>
            <span className={step === 2 ? 'font-semibold text-blue-600' : ''}>Tamaño</span>
            <span className={step === 3 ? 'font-semibold text-blue-600' : ''}>Calidad</span>
            <span className={step === 4 ? 'font-semibold text-blue-600' : ''}>Contacto</span>
          </div>
        </div>
      )}

      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        <div className={`p-6 transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          
          {/* Step 1: Tipo de Reforma */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  ¿Qué tipo de reforma necesitas?
                </h3>
                <p className="text-sm text-slate-600">Selecciona el espacio que quieres renovar</p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {tiposReforma.map((tipo) => {
                  const Icon = tipo.icon;
                  const isSelected = formData.tipo === tipo.id;
                  return (
                    <button
                      key={tipo.id}
                      onClick={() => setFormData({ ...formData, tipo: tipo.id })}
                      className={`
                        group relative p-4 rounded-xl border-2 transition-all text-left
                        ${isSelected
                          ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20 scale-[1.02]'
                          : 'border-slate-200 hover:border-blue-300 hover:shadow-md'
                        }
                      `}
                    >
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center mb-2 bg-gradient-to-br ${tipo.gradient} transition-transform
                        ${isSelected ? 'scale-110' : 'group-hover:scale-105'}
                      `}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="font-bold text-base text-slate-900 mb-0.5">
                        {tipo.nombre}
                      </div>
                      <div className="text-xs text-slate-600">
                        Desde <span className="font-semibold text-blue-600">{tipo.precio}€/m²</span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Metros Cuadrados */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  ¿Cuántos metros cuadrados?
                </h3>
                <p className="text-sm text-slate-600">Desliza para ajustar el tamaño</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="text-center mb-4">
                  <div className="inline-flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-blue-600">
                      {formData.metros}
                    </span>
                    <span className="text-2xl font-semibold text-blue-400">m²</span>
                  </div>
                  <p className="text-slate-600 mt-1 text-xs">
                    {formData.metros < 30 && 'Reforma pequeña'}
                    {formData.metros >= 30 && formData.metros < 80 && 'Reforma mediana'}
                    {formData.metros >= 80 && formData.metros < 150 && 'Reforma grande'}
                    {formData.metros >= 150 && 'Reforma muy grande'}
                  </p>
                </div>
                
                <div className="relative">
                  <input
                    type="range"
                    min="5"
                    max="200"
                    value={formData.metros}
                    onChange={(e) => setFormData({ ...formData, metros: Number(e.target.value) })}
                    className="w-full h-2 bg-white rounded-full appearance-none cursor-pointer slider-thumb"
                    style={{
                      background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((formData.metros - 5) / 195) * 100}%, #E2E8F0 ${((formData.metros - 5) / 195) * 100}%, #E2E8F0 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2 px-1">
                    <span className="font-medium">5m²</span>
                    <span className="font-medium">200m²</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[30, 50, 80, 120].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setFormData({ ...formData, metros: preset })}
                    className={`
                      py-2 px-2 rounded-lg border-2 font-medium text-xs transition-all
                      ${formData.metros === preset
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-600 hover:border-blue-300'
                      }
                    `}
                  >
                    {preset}m²
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Calidad */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  ¿Qué nivel de calidad buscas?
                </h3>
                <p className="text-sm text-slate-600">Define el tipo de acabados</p>
              </div>
              
              <div className="space-y-3">
                {calidades.map((calidad) => {
                  const isSelected = formData.calidad === calidad.id;
                  return (
                    <button
                      key={calidad.id}
                      onClick={() => setFormData({ ...formData, calidad: calidad.id })}
                      className={`
                        group relative w-full p-4 rounded-xl border-2 transition-all text-left
                        ${isSelected
                          ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20'
                          : 'border-slate-200 hover:border-blue-300 hover:shadow-md'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-base text-slate-900">
                              {calidad.nombre}
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getColorClasses(calidad.color)}`}>
                              {calidad.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mb-2">
                            {calidad.descripcion}
                          </p>
                          <div className="flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-blue-500" />
                            <span className="text-[10px] font-medium text-slate-700">
                              Multiplicador: {calidad.multiplicador}x
                            </span>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="ml-3">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" strokeWidth={3} />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Email Gate */}
          {step === 4 && !showResults && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-500/30">
                  <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  ¡Casi listo!
                </h3>
                <p className="text-sm text-slate-600">
                  Introduce tu email para recibir tu presupuesto
                </p>
              </div>
              
              <form onSubmit={handleSubmitEmail} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@email.com"
                    required
                    className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>
                
                <button
                  type="submit"
                  className="group w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center justify-center gap-2"
                >
                  <span>Ver mi Presupuesto</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
                  <div className="w-3 h-3 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-2 h-2 text-green-600" strokeWidth={3} />
                  </div>
                  <span>Sin spam. Solo tu presupuesto y ofertas exclusivas</span>
                </div>
              </form>

              {/* Preview compacto */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-3 border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2 text-xs">Resumen de tu selección:</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tipo:</span>
                    <span className="font-semibold text-slate-900">
                      {tiposReforma.find(t => t.id === formData.tipo)?.nombre}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Metros:</span>
                    <span className="font-semibold text-slate-900">{formData.metros}m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Calidad:</span>
                    <span className="font-semibold text-slate-900">
                      {calidades.find(c => c.id === formData.calidad)?.nombre}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {showResults && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-500/30">
                  <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  ¡Tu Presupuesto Está Listo!
                </h3>
                <p className="text-xs text-slate-600">
                  {formData.metros}m² · {tiposReforma.find(t => t.id === formData.tipo)?.nombre} · Calidad {calidades.find(c => c.id === formData.calidad)?.nombre}
                </p>
              </div>
              
              <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-xl p-6 text-white text-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6TTEyIDQyYzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
                <div className="relative">
                  <div className="text-xs font-medium mb-2 text-blue-200">Rango de Inversión Estimado</div>
                  <div className="text-4xl font-bold mb-2">
                    {presupuesto.min.toLocaleString('es-ES')}€ - {presupuesto.max.toLocaleString('es-ES')}€
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] text-blue-100 mt-2">
                    <Sparkles className="w-3 h-3" />
                    <span>Presupuesto orientativo sujeto a visita técnica</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 mb-0.5 text-sm">
                      ¡Presupuesto enviado!
                    </div>
                    <div className="text-xs text-slate-600 mb-1">
                      Hemos enviado el desglose completo a <span className="font-semibold text-slate-900">{formData.email}</span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Incluye portfolio de trabajos similares y próximos pasos
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="group flex items-center justify-center gap-2 py-3 px-4 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Nueva Consulta</span>
                </button>
                <a
                  href="/contacto"
                  className="group flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30 text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Solicitar Visita</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="group flex items-center gap-2 px-4 py-2.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Atrás</span>
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData.tipo) ||
                  (step === 2 && formData.metros < 5) ||
                  (step === 3 && !formData.calidad)
                }
                className="group flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:shadow-none text-sm"
              >
                <span>Continuar</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}