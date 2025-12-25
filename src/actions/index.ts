// src/actions/index.ts
import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';
import { getClientEmailTemplate, getTeamNotificationTemplate } from '../utils/emailTemplates';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Patrones comunes de spam
const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|lottery|winner|bitcoin|crypto|investment opportunity)\b/i,
  /\b(click here|buy now|limited time|act now|urgent)\b/i,
  /(http[s]?:\/\/[^\s]+){3,}/i, // Más de 2 URLs
  /(.)\1{10,}/i, // Caracteres repetidos excesivamente
];

// Validar si el texto contiene spam
function containsSpam(text: string): boolean {
  return SPAM_PATTERNS.some(pattern => pattern.test(text));
}

// Validar formato de teléfono español
function isValidSpanishPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  // Acepta formatos: +34XXXXXXXXX, 34XXXXXXXXX, 6XXXXXXXX, 7XXXXXXXX, 9XXXXXXXX
  return /^(\+?34)?[679]\d{8}$/.test(cleaned);
}

export const server = {
  sendContactEmail: defineAction({
    accept: 'form',
    input: z.object({
      nombre: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'Nombre demasiado largo')
        .refine(val => !containsSpam(val), 'Contenido no válido'),
      empresa: z.string()
        .min(2, 'El nombre de la empresa es requerido')
        .max(150, 'Nombre de empresa demasiado largo')
        .refine(val => !containsSpam(val), 'Contenido no válido'),
      email: z.string()
        .email('Email inválido')
        .max(254, 'Email demasiado largo')
        // Rechazar dominios temporales comunes
        .refine(val => {
          const tempDomains = ['tempmail', 'throwaway', 'guerrilla', '10minute', 'mailinator', 'yopmail'];
          const domain = val.split('@')[1]?.toLowerCase() || '';
          return !tempDomains.some(temp => domain.includes(temp));
        }, 'Por favor usa un email válido'),
      telefono: z.string()
        .min(9, 'Teléfono inválido')
        .refine(isValidSpanishPhone, 'Formato de teléfono no válido'),
      zona: z.string().min(1, 'Debes seleccionar una zona'),
      mensaje: z.string()
        .max(2000, 'Mensaje demasiado largo')
        .optional()
        .refine(val => !val || !containsSpam(val), 'Contenido no válido'),
      
      // === CAMPOS DE SEGURIDAD ===
      // Honeypot - debe estar vacío (los bots lo rellenan)
      website: z.string().max(0, 'Error de validación').optional(),
      
      // Timestamp - tiempo mínimo de llenado (5 segundos)
      _timestamp: z.string().optional(),
      
      // Token simple anti-replay
      _token: z.string().optional(),
    }),
    handler: async (input, context) => {
      console.log('📨 [ACTION] Iniciando validación de seguridad...');

      // === VERIFICACIÓN HONEYPOT ===
      if (input.website && input.website.length > 0) {
        console.warn('🤖 [SPAM] Honeypot activado - Bot detectado');
        // Simular éxito para no alertar al bot
        return {
          success: true,
          message: 'Email enviado correctamente',
        };
      }

      // === VERIFICACIÓN DE TIEMPO MÍNIMO ===
      if (input._timestamp) {
        const formStartTime = parseInt(input._timestamp, 10);
        const now = Date.now();
        const elapsedSeconds = (now - formStartTime) / 1000;
        
        if (elapsedSeconds < 5) {
          console.warn('🤖 [SPAM] Formulario enviado muy rápido:', elapsedSeconds, 'segundos');
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: 'Por favor, tómate tu tiempo para completar el formulario.',
          });
        }
      }

      // === RATE LIMITING CON COOKIES ===
      const lastSubmit = context.cookies.get('_form_last')?.value;
      const now = Date.now();
      
      if (lastSubmit) {
        const timeSinceLastSubmit = now - parseInt(lastSubmit, 10);
        const minInterval = 60 * 1000; // 1 minuto entre envíos
        
        if (timeSinceLastSubmit < minInterval) {
          console.warn('🤖 [SPAM] Rate limit - Envío muy frecuente');
          throw new ActionError({
            code: 'TOO_MANY_REQUESTS',
            message: 'Por favor espera un momento antes de enviar otro formulario.',
          });
        }
      }

      // === VERIFICACIÓN DE CONTENIDO SPAM ===
      const allText = `${input.nombre} ${input.empresa} ${input.mensaje || ''}`;
      if (containsSpam(allText)) {
        console.warn('🤖 [SPAM] Contenido spam detectado');
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'El contenido del mensaje no es válido.',
        });
      }

      console.log('✅ [ACTION] Validaciones de seguridad pasadas');
      console.log('📋 [ACTION] Datos recibidos:', { ...input, email: '***', _timestamp: '***' });

      try {
        const emailData = {
          nombre: input.nombre,
          empresa: input.empresa,
          email: input.email,
          telefono: input.telefono,
          zona: input.zona,
          mensaje: input.mensaje || '',
        };

        console.log('📧 [ACTION] Enviando email al cliente...');
        
        // Email de confirmación al cliente
        const clientEmailResponse = await resend.emails.send({
          from: 'Obras Digitales <noreply@obrasdigitales.es>',
          to: input.email,
          subject: '¡Gracias por contactarnos! - Tu Demo Personalizada',
          html: getClientEmailTemplate(emailData),
        });

        if (clientEmailResponse.error) {
          console.error('❌ [ACTION] Error al enviar email al cliente:', clientEmailResponse.error);
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Error al enviar el email. Por favor, inténtalo de nuevo.',
          });
        }

        console.log('✅ [ACTION] Email cliente enviado:', clientEmailResponse.data?.id);

        // Notificación al equipo
        console.log('📧 [ACTION] Enviando notificación al equipo...');
        
        const teamEmailResponse = await resend.emails.send({
          from: 'Notificaciones <noreply@obrasdigitales.es>',
          to: 'wilsonvicentemc@gmail.com',
          subject: `🎯 Nueva solicitud de demo - ${input.empresa}`,
          html: getTeamNotificationTemplate(emailData),
        });

        if (teamEmailResponse.error) {
          console.error('❌ [ACTION] Error al enviar notificación:', teamEmailResponse.error);
        } else {
          console.log('✅ [ACTION] Notificación enviada:', teamEmailResponse.data?.id);
        }

        // Guardar cookie de rate limiting
        context.cookies.set('_form_last', now.toString(), {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 3600, // 1 hora
          path: '/',
        });

        console.log('✅ [ACTION] Proceso completado exitosamente');

        return {
          success: true,
          message: 'Email enviado correctamente',
          emailIds: {
            client: clientEmailResponse.data?.id || 'unknown',
            team: teamEmailResponse.data?.id || 'unknown',
          }
        };
      } catch (error) {
        console.error('❌ [ACTION] Error general:', error);
        if (error instanceof ActionError) throw error;
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.',
        });
      }
    },
  }),
};