// src/components/react/ContactForm.jsx
import { useState } from 'react';
import { CheckCircle, Loader2, Video, Sparkles } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    zona: '',
    mensaje: '',
  });
  
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const zonas = [
    'Barrio de Salamanca',
    'Chamartín',
    'Pozuelo',
    'Majadahonda',
    'Las Rozas',
    'Retiro',
    'Boadilla del Monte',
    'Alcobendas',
    'Getafe',
    'Hortaleza',
    'Otra zona',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Llamada a Astro Action
      const { actions } = await import('astro:actions');
      const { data, error } = await actions.sendContactEmail(formData);

      if (error) {
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch (err) {
      console.error('Error:', err);
      setStatus('error');
    }
  };

  // Estado de éxito
  if (status === 'success') {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          ¡Mensaje enviado!
        </h3>
        <p className="text-slate-600 mb-6">
          Gracias por contactarnos. Te responderemos en menos de 24 horas.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-sm font-semibold text-slate-700 mb-2">
          Nombre completo *
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          placeholder="Juan Pérez"
        />
      </div>

      {/* Empresa */}
      <div>
        <label htmlFor="empresa" className="block text-sm font-semibold text-slate-700 mb-2">
          Empresa *
        </label>
        <input
          type="text"
          id="empresa"
          name="empresa"
          value={formData.empresa}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          placeholder="Reformas XYZ"
        />
      </div>

      {/* Email y Teléfono en grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="juan@empresa.com"
          />
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-semibold text-slate-700 mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="+34 600 000 000"
          />
        </div>
      </div>

      {/* Zona de operación */}
      <div>
        <label htmlFor="zona" className="block text-sm font-semibold text-slate-700 mb-2">
          Zona principal de operación *
        </label>
        <select
          id="zona"
          name="zona"
          value={formData.zona}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
        >
          <option value="">Selecciona una zona...</option>
          {zonas.map((zona) => (
            <option key={zona} value={zona}>
              {zona}
            </option>
          ))}
        </select>
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="mensaje" className="block text-sm font-semibold text-slate-700 mb-2">
          Cuéntanos sobre tu empresa (opcional)
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
          placeholder="Ej: Somos una empresa familiar con 15 años de experiencia en reformas integrales..."
        />
      </div>

      {/* Política de privacidad */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacidad"
          required
          className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="privacidad" className="text-sm text-slate-600">
          Acepto la{' '}
          <a href="/privacidad" className="text-blue-600 hover:underline">
            política de privacidad
          </a>{' '}
          y el tratamiento de mis datos para recibir información comercial.
        </label>
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-red-700 text-sm">
          Ha ocurrido un error al enviar el formulario. Por favor, inténtalo de nuevo.
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl text-lg"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Enviando...
          </span>
        ) : (
          'Solicitar Demo Gratuita'
        )}
      </button>

      {/* Beneficios con iconos */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span>Respuesta en menos de 24h</span>
        </div>
        <div className="flex items-center gap-2">
          <Video className="w-4 h-4 text-blue-600" />
          <span>Videollamada de 30 minutos</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-600" />
          <span>Sin compromiso</span>
        </div>
      </div>
    </form>
  );
}