import { z } from 'zod';

export const createContactFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t('validation.name.min')).max(100, t('validation.name.max')),
    email: z.email(t('validation.email.invalid')),
    message: z.string().min(10, t('validation.message.min')).max(1000, t('validation.message.max')),
  });

export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  message: z.string().min(10).max(1000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
