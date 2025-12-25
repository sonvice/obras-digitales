// src/actions/index.ts
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';
import { getClientEmailTemplate, getTeamNotificationTemplate } from '../utils/emailTemplates';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  sendContactEmail: defineAction({
    accept: 'form',
    input: z.object({
      nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
      empresa: z.string().min(2, 'El nombre de la empresa es requerido'),
      email: z.string().email('Email inválido'),
      telefono: z.string().min(9, 'Teléfono inválido'),
      zona: z.string().min(1, 'Debes seleccionar una zona'),
      mensaje: z.string().optional(),
    }),
    handler: async (input) => {
      console.log('📨 [ACTION] Iniciando envío de emails...');
      console.log('📋 [ACTION] Datos recibidos:', { ...input, email: '***' });
      console.log('🔑 [ACTION] API Key configurada:', !!import.meta.env.RESEND_API_KEY);

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
          throw new Error(`Error al enviar email: ${clientEmailResponse.error.message}`);
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
          console.warn('⚠️ [ACTION] Email al equipo falló, pero el cliente recibió su confirmación');
        } else {
          console.log('✅ [ACTION] Notificación enviada:', teamEmailResponse.data?.id);
        }

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
        console.error('📝 [ACTION] Stack:', error instanceof Error ? error.stack : 'No stack');
        throw error;
      }
    },
  }),
};
