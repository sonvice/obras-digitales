// src/actions/index.ts - VERSIÓN PARA PRODUCCIÓN
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';
import { getClientEmailTemplate, getTeamNotificationTemplate } from '../utils/emailTemplates';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  sendContactEmail: defineAction({
    accept: 'json',
    input: z.object({
      nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
      empresa: z.string().min(2, 'El nombre de la empresa es requerido'),
      email: z.string().email('Email inválido'),
      telefono: z.string().min(9, 'Teléfono inválido'),
      zona: z.string().min(1, 'Debes seleccionar una zona'),
      mensaje: z.string().optional(),
    }),
    handler: async (input) => {
      console.log('📨 Iniciando envío de emails...');
      console.log('📋 Datos recibidos:', input);

      try {
        const emailData = {
          nombre: input.nombre,
          empresa: input.empresa,
          email: input.email,
          telefono: input.telefono,
          zona: input.zona,
          mensaje: input.mensaje,
        };

        // Email de confirmación al cliente
        const clientEmailResponse = await resend.emails.send({
          from: 'Obras Digitales <noreply@obrasdigitales.es>',
          to: input.email, // Ahora sí puede ir a cualquier email
          subject: '¡Gracias por contactarnos! - Tu Demo Personalizada',
          html: getClientEmailTemplate(emailData),
        });

        if (clientEmailResponse.error) {
          console.error('❌ Error al enviar email al cliente:', clientEmailResponse.error);
          throw new Error(`Error al enviar email: ${clientEmailResponse.error.message}`);
        }

        console.log('✅ Email cliente enviado:', clientEmailResponse.data?.id);

        // Notificación al equipo
        const teamEmailResponse = await resend.emails.send({
          from: 'Notificaciones <noreply@obrasdigitales.es>',
          to: 'wilsonvicentemc@gmail.com', // Tu email para recibir notificaciones
          subject: `🎯 Nueva solicitud de demo - ${input.empresa}`,
          html: getTeamNotificationTemplate(emailData),
        });

        if (teamEmailResponse.error) {
          console.error('❌ Error al enviar notificación:', teamEmailResponse.error);
          console.warn('⚠️ Email al equipo falló, pero el cliente recibió su confirmación');
        } else {
          console.log('✅ Notificación enviada:', teamEmailResponse.data?.id);
        }

        console.log('✅ Proceso de emails completado');

        return {
          success: true,
          message: 'Email enviado correctamente',
          emailIds: {
            client: clientEmailResponse.data?.id || 'unknown',
            team: teamEmailResponse.data?.id || 'unknown',
          }
        };
      } catch (error) {
        console.error('❌ Error general:', error);
        console.error('📝 Detalles:', error instanceof Error ? error.message : JSON.stringify(error, null, 2));
        throw new Error('Error al enviar el email. Por favor, intenta de nuevo.');
      }
    },
  }),
};