'use client';

import { sendEmail } from '@/actions/send-email';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface FormsData {
  name: string;
  email: string;
  message: string;
}

export function useFormSubmit() {
  return useMutation({
    mutationFn: async (data: FormsData) => {
      const result = await sendEmail(data);

      if (!result.success) {
        throw new Error(result.error || 'Failed to send message');
      }

      return result;
    },
    onSuccess: (_, variables) => {
      toast.success('Message sent successfully', {
        description: `Thank you for your message ${variables.name}. I'll get back to you soon!`,
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to send message', {
        description: error.message || 'Please try again later.',
      });
    },
  });
}
