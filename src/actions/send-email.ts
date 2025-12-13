'use server';

import { ContactEmailTemplate } from '@/components/features/contact/ContactEmailTemplate';
import { contactFormSchema } from '@/lib/schemas';
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not configured');
}
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: unknown) {
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false, error: 'Invalid form data' };
  }

  if (!process.env.NEXT_PUBLIC_CONTACT_EMAIL_FROM || !process.env.NEXT_PUBLIC_CONTACT_EMAIL_TO) {
    return { success: false, error: 'Contact email configuration is missing' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `tommeras.no <${process.env.NEXT_PUBLIC_CONTACT_EMAIL_FROM}>`,
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL_TO,
      replyTo: parsed.data.email,
      subject: `${parsed.data.name} sent you a message`,
      react: ContactEmailTemplate(parsed.data),
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
