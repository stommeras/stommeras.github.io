'use client';

import { sendEmail } from '@/actions/send-email';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface FormsData {
  name: string;
  email: string;
  message: string;
}

export function useFormSubmit() {
  const t = useTranslations('contact.toast');

  return useMutation({
    mutationFn: async (data: FormsData) => {
      const result = await sendEmail(data);

      if (!result.success) {
        throw new Error(result.error || 'Failed to send message');
      }

      return result;
    },
    onSuccess: () => {
      toast.success(t('success.title'), {
        description: t('success.description'),
      });
    },
    onError: (error: Error) => {
      toast.error(t('error.title'), {
        description: error.message || t('error.description'),
      });
    },
  });
}
