import React, { useState } from 'react';
import { 
  Check, 
  Star, 
  Target,
  Rocket,
  ChevronRight,
  Zap,
  TrendingUp,
  Minus,
  Plus
} from 'lucide-react';

const PricingWithSlider = () => {
  const [professionalPages, setProfessionalPages] = useState(7);
  const [premiumPages, setPremiumPages] = useState(15);
  
  // Precios base AJUSTADOS para freelancer
  const PROFESIONAL_BASE = 1400;
  const PREMIUM_BASE = 2000;
  
  // Páginas incluidas por defecto
  const PROFESIONAL_PAGES_INCLUDED = 7;
  const PREMIUM_PAGES_INCLUDED = 15;
  
  // Precio por página adicional
  const PRICE_PER_PAGE_PROFESIONAL = 45;
  const PRICE_PER_PAGE_PREMIUM = 35;
  
  // Calcular precios
  const calculateProfessionalPrice = (pages) => {
    if (pages <= PROFESIONAL_PAGES_INCLUDED) {
      return PROFESIONAL_BASE;
    }
    const extraPages = pages - PROFESIONAL_PAGES_INCLUDED;
    return PROFESIONAL_BASE + (extraPages * PRICE_PER_PAGE_PROFESIONAL);
  };
  
  const calculatePremiumPrice = (pages) => {
    if (pages <= PREMIUM_PAGES_INCLUDED) {
      return PREMIUM_BASE;
    }
    const extraPages = pages - PREMIUM_PAGES_INCLUDED;
    return PREMIUM_BASE + (extraPages * PRICE_PER_PAGE_PREMIUM);
  };
  
  const professionalPrice = calculateProfessionalPrice(professionalPages);
  const premiumPrice = calculatePremiumPrice(premiumPages);
  
  return (
    <section className="py-20 bg-slate-50 bg-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Deja de perder tiempo con visitas inútiles
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Un sistema completo que filtra curiosos y atrae clientes con presupuesto real. 
            <span className="font-semibold text-slate-900"> No es una web, es tu comercial digital trabajando 24/7.</span>
          </p>
        </div>

        {/* Grid de 2 columnas */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Plan 1: Profesional */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-slate-200 hover:border-blue-400 transition-all">
            <div className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Sistema Profesional</h3>
                <p className="text-slate-600">El motor completo de captación para empezar a filtrar leads</p>
              </div>
              
              {/* Slider integrado en la card */}
              <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    Landing Pages SEO
                  </label>
                  <span className="text-2xl font-bold text-blue-600">{professionalPages}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setProfessionalPages(Math.max(3, professionalPages - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                    aria-label="Disminuir páginas"
                  >
                    <Minus className="w-4 h-4 text-slate-600" />
                  </button>
                  
                  <input
                    type="range"
                    min="3"
                    max="30"
                    value={professionalPages}
                    onChange={(e) => setProfessionalPages(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  
                  <button
                    onClick={() => setProfessionalPages(Math.min(30, professionalPages + 1))}
                    className="w-8 h-8 rounded-lg bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                    aria-label="Aumentar páginas"
                  >
                    <Plus className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
                
                <p className="text-xs text-slate-500 mt-2 text-center">
                  Más páginas = Más barrios cubiertos
                </p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-slate-900">
                    {professionalPrice.toLocaleString('es-ES')}€
                  </span>
                  <span className="text-slate-500 text-lg">setup</span>
                </div>
                
                {professionalPages > PROFESIONAL_PAGES_INCLUDED && (
                  <div className="text-xs text-blue-600 mt-2 bg-blue-50 p-2 rounded">
                    Base: {PROFESIONAL_BASE}€ + {professionalPages - PROFESIONAL_PAGES_INCLUDED} páginas × {PRICE_PER_PAGE_PROFESIONAL}€
                  </div>
                )}
                
                <div className="text-sm text-slate-600 mt-2">+ 70€/mes mantenimiento</div>
                
                {/* Desglose mensualidad */}
                <details className="mt-3 mb-4 text-xs bg-slate-50 rounded-lg border border-slate-200">
                  <summary className="cursor-pointer p-3 hover:bg-slate-100 rounded-lg font-medium text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      ¿Qué incluye la mensualidad?
                    </span>
                    <Plus className="w-4 h-4" />
                  </summary>
                  <div className="px-3 pb-3 pt-2 space-y-2 border-t border-slate-200">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Hosting frontend ultra-rápido (Vercel/Netlify)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Hosting WordPress backend</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Actualizaciones de seguridad automáticas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Copias de seguridad diarias</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Monitoreo 24/7 (99.9% uptime)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Soporte técnico (respuesta &lt;24h)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Certificado SSL renovado automáticamente</span>
                    </div>
                  </div>
                </details>
                
                <a 
                  href={`/contacto?plan=profesional&pages=${professionalPages}`}
                  className="block w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-center transition-all shadow-lg group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Quiero mi sistema
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>

              {/* Beneficio destacado */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900 text-sm">Ahorra +120 horas al año</p>
                    <p className="text-blue-700 text-xs mt-1">Dejas de ir a visitas sin presupuesto</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                {/* Features principales destacados */}
                <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                  <Zap className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Calculadora de presupuestos interactiva</span>
                    <p className="text-xs text-slate-600 mt-1">Filtra clientes por rango de inversión</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                  <Zap className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Slider Antes/Después interactivo</span>
                    <p className="text-xs text-slate-600 mt-1">Prueba social visual que convierte</p>
                  </div>
                </div>

                <div className="h-px bg-slate-200 my-4"></div>

                {/* Resto de features */}
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Web ultra-rápida (carga en &lt;0.5s)</span>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Panel WordPress sencillo</span>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Galería dinámica de obras</span>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Formularios anti-spam</span>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>SEO técnico optimizado</span>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Soporte técnico mensual</span>
                </div>
              </div>

              {/* Siempre incluido */}
              <div className="mt-6 p-4 bg-linear-to-r from-emerald-50 to-green-50 rounded-lg border-l-4 border-green-600">
                <h4 className="font-bold text-green-900 text-sm mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Siempre incluido
                </h4>
                <div className="space-y-2 text-xs text-green-800">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Web autogestionable (WordPress)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Formación para gestionar web</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Botón flotante de WhatsApp</span>
                  </div>
                </div>
              </div>

              {/* Ideal para */}
              <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-600">
                  <strong className="text-slate-900">Ideal para:</strong> Empresas que gestionan 3-8 obras/mes y quieren dejar de depender de Habitissimo.
                </p>
              </div>
            </div>
          </div>

          {/* Plan 2: Premium (DESTACADO) */}
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-600 transform lg:scale-105">
            {/* Badge "Recomendado" */}
            <div className="absolute top-0 right-0 bg-linear-to-r from-blue-600 to-blue-700 text-white text-xs font-bold px-4 py-1 rounded-bl-lg flex items-center gap-1">
              <Rocket className="w-3 h-3" />
              RECOMENDADO
            </div>

            <div className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Sistema Premium</h3>
                <p className="text-slate-600">Dominación SEO local + máxima automatización</p>
              </div>
              
              {/* Slider integrado en la card */}
              <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    Landing Pages SEO
                  </label>
                  <span className="text-2xl font-bold text-blue-600">{premiumPages}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPremiumPages(Math.max(10, premiumPages - 1))}
                    className="w-8 h-8 rounded-lg bg-blue-200 hover:bg-blue-300 flex items-center justify-center transition-colors"
                    aria-label="Disminuir páginas"
                  >
                    <Minus className="w-4 h-4 text-blue-700" />
                  </button>
                  
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={premiumPages}
                    onChange={(e) => setPremiumPages(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  
                  <button
                    onClick={() => setPremiumPages(Math.min(50, premiumPages + 1))}
                    className="w-8 h-8 rounded-lg bg-blue-200 hover:bg-blue-300 flex items-center justify-center transition-colors"
                    aria-label="Aumentar páginas"
                  >
                    <Plus className="w-4 h-4 text-blue-700" />
                  </button>
                </div>
                
                <p className="text-xs text-blue-700 mt-2 text-center">
                  Domina toda tu zona geográfica
                </p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-blue-600">
                    {premiumPrice.toLocaleString('es-ES')}€
                  </span>
                  <span className="text-slate-500 text-lg">setup</span>
                </div>
                
                {premiumPages > PREMIUM_PAGES_INCLUDED && (
                  <div className="text-xs text-blue-600 mt-2 bg-blue-100 p-2 rounded">
                    Base: {PREMIUM_BASE}€ + {premiumPages - PREMIUM_PAGES_INCLUDED} páginas × {PRICE_PER_PAGE_PREMIUM}€
                  </div>
                )}
                
                <div className="text-sm text-slate-600 mt-2">+ 120€/mes mantenimiento Premium</div>
                
                {/* Desglose mensualidad Premium */}
                <details className="mt-3 mb-4 text-xs bg-blue-50 rounded-lg border border-blue-200">
                  <summary className="cursor-pointer p-3 hover:bg-blue-100 rounded-lg font-medium text-blue-900 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-600" />
                      ¿Qué incluye la mensualidad Premium?
                    </span>
                    <Plus className="w-4 h-4" />
                  </summary>
                  <div className="px-3 pb-3 pt-2 space-y-2 border-t border-blue-200">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="font-medium">Todo lo del plan Profesional +</span>
                    </div>
                    <div className="h-px bg-blue-200 my-2"></div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Soporte prioritario</strong> (respuesta &lt;4h hábiles)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Informe mensual detallado de leads + fuentes de tráfico</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>1 hora/mes de ajustes o mejoras sin coste extra</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Optimizaciones mensuales de rendimiento SEO</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Revisión trimestral de estrategia digital</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Acceso prioritario a nuevas funcionalidades</span>
                    </div>
                  </div>
                </details>
                
                <a 
                  href={`/contacto?plan=premium&pages=${premiumPages}`}
                  className="block w-full py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg text-center transition-all shadow-xl group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Conseguir sistema Premium
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>

              {/* Beneficio destacado */}
              <div className="mb-6 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-600">
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-green-600 shrink-0" />
                  <div>
                    <p className="font-bold text-green-900 text-sm">Preparado para 20+ leads/mes</p>
                    <p className="text-green-700 text-xs mt-1">Sistema para empresas en crecimiento</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="font-semibold text-blue-900">Todo del plan Profesional +</span>
                </div>

                <div className="h-px bg-slate-200 my-2"></div>

                {/* Diferenciales Premium */}
                <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Cobertura SEO ampliada</span>
                    <p className="text-xs text-slate-600 mt-1">Domina todos los barrios clave</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span><strong>Blog con estrategia de contenido</strong></span>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Integración con CRM</span>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Automatizaciones personalizadas</span>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Setup Google Ads inicial</span>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Informe mensual de leads</span>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Formación WordPress + estrategia</span>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span><strong>Soporte prioritario</strong> (&lt;4h)</span>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Consultoría trimestral</span>
                </div>
              </div>

              {/* Siempre incluido */}
              <div className="mt-6 p-4 bg-linear-to-r from-emerald-50 to-green-50 rounded-lg border-l-4 border-green-600">
                <h4 className="font-bold text-green-900 text-sm mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Siempre incluido
                </h4>
                <div className="space-y-2 text-xs text-green-800">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Web autogestionable (WordPress)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Formación para gestionar web</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Botón flotante de WhatsApp</span>
                  </div>
                </div>
              </div>

              {/* Ideal para */}
              <div className="mt-6 p-4 bg-linear-to-r from-slate-50 to-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-slate-700">
                  <strong className="text-slate-900">Ideal para:</strong> Empresas con 10+ obras/mes que quieren dominar su zona.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* CTA final */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto bg-linear-to-r from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-3">
              ¿No estás seguro de cuál elegir?
            </h3>
            <p className="text-slate-300 mb-6">
              Te explicamos cuál se ajusta mejor a tu volumen de obras y objetivos. Sin compromiso.
            </p>
            <a 
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-lg transition-all shadow-lg"
            >
              Hablar con un especialista
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingWithSlider;