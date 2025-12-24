export interface ClientEmailData {
  nombre: string;
  empresa: string;
  email: string;
  zona: string;
  telefono: string;
  mensaje?: string;
}

export const getClientEmailTemplate = (data: ClientEmailData): string => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f3f4f6;">
    <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px;">¡Gracias por contactarnos!</h1>
      <p style="color: #dbeafe; margin: 10px 0 0 0;">Hemos recibido tu solicitud</p>
    </div>
    
    <div style="background: #ffffff; padding: 40px 30px;">
      <p style="font-size: 18px; margin-bottom: 20px;">Hola <strong style="color: #2563eb;">${data.nombre}</strong> 👋</p>
      
      <p style="font-size: 16px; line-height: 1.8; margin-bottom: 25px; color: #4b5563;">
        Hemos recibido tu solicitud de demo para <strong>${data.empresa}</strong>. Te contactaremos en menos de 24 horas.
      </p>
      
      <div style="background: #f9fafb; padding: 25px; border-radius: 12px; margin: 25px 0;">
        <h3 style="margin: 0 0 15px 0; color: #1f2937;">📋 Resumen de tu solicitud</h3>
        <table style="width: 100%;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280;"><strong>Empresa:</strong></td>
            <td style="padding: 8px 0;">${data.empresa}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;"><strong>Zona:</strong></td>
            <td style="padding: 8px 0;">${data.zona}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;"><strong>Teléfono:</strong></td>
            <td style="padding: 8px 0;">${data.telefono}</td>
          </tr>
        </table>
      </div>
      
      ${data.mensaje ? `
        <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #1e40af;"><strong>Tu mensaje:</strong></p>
          <p style="margin: 10px 0 0 0; font-style: italic;">"${data.mensaje}"</p>
        </div>
      ` : ''}
    </div>
    
    <div style="text-align: center; padding: 30px; background: #f9fafb; border-radius: 0 0 12px 12px;">
      <p style="margin: 0; color: #6b7280; font-size: 14px;">© ${new Date().getFullYear()} Tu Empresa</p>
    </div>
  </body>
</html>
`;

export const getTeamNotificationTemplate = (data: ClientEmailData): string => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 12px 12px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 24px;">🎯 Nueva Solicitud de Demo</h1>
      <p style="color: #d1fae5; margin: 5px 0 0 0; font-size: 14px;">
        ${new Date().toLocaleDateString('es-ES', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
    </div>
    
    <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb;">
      <div style="background: #f9fafb; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
        <h2 style="margin: 0 0 20px 0; color: #1f2937; border-bottom: 3px solid #3b82f6; padding-bottom: 10px;">📋 Datos del Cliente</h2>
        <table style="width: 100%;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Nombre:</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${data.nombre}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Empresa:</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${data.empresa}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Email:</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <a href="mailto:${data.email}" style="color: #3b82f6;">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Teléfono:</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <a href="tel:${data.telefono}" style="color: #3b82f6;">${data.telefono}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; font-weight: 600;">Zona:</td>
            <td style="padding: 12px 0;">${data.zona}</td>
          </tr>
        </table>
      </div>
      
      ${data.mensaje ? `
        <div style="background: #eff6ff; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #3b82f6;">
          <h3 style="margin: 0 0 12px 0; color: #1e40af;">💬 Mensaje del Cliente:</h3>
          <p style="margin: 0; color: #1e3a8a; font-style: italic;">"${data.mensaje}"</p>
        </div>
      ` : ''}
      
      <div style="background: #dbeafe; padding: 25px; border-radius: 12px;">
        <h3 style="margin: 0 0 20px 0; color: #1e40af;">⚡ Acciones Rápidas</h3>
        <a href="mailto:${data.email}" style="display: block; padding: 16px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; text-align: center; margin-bottom: 12px;">📧 Responder Email</a>
        <a href="tel:${data.telefono}" style="display: block; padding: 16px; background: #10b981; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; text-align: center; margin-bottom: 12px;">📞 Llamar</a>
        <a href="https://wa.me/${data.telefono.replace(/\D/g, '')}" style="display: block; padding: 16px; background: #059669; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; text-align: center;">💬 WhatsApp</a>
      </div>
    </div>
  </body>
</html>
`;