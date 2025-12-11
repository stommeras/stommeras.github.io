'use client';

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
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          ...data,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send message');
      }

      return result;
    },
    onSuccess: () => {
      toast.success('Message sent!', {
        description: "Thank you for your message. I'll get back to you soon!",
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to send message', {
        description: error.message || 'Please try again later.',
      });
    },
  });
}
