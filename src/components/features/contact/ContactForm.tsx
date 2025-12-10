/* eslint-disable react/no-children-prop */
'use client';

import { useToastManager } from '@/components/ui';
import * as Field from '@/components/ui/forms/Field';
import { Submit } from '@/components/ui/forms/Submit';
import { useForm } from '@tanstack/react-form';
import clsx from 'clsx';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const defaultValues: ContactFormData = {
  name: '',
  email: '',
  message: '',
};

export function ContactForm() {
  const toastManager = useToastManager();

  const form = useForm({
    defaultValues,
    onSubmit: ({ value: formValues }) => {
      toastManager.add({
        title: 'Form submitted',
        description: 'The form contains these values:',
        data: formValues,
      });
    },
  });

  return (
    <form
      aria-label="Contact form"
      className="flex w-full flex-col gap-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}>
      <div className="flex flex-col gap-4 md:flex-row">
        <form.Field
          name="name"
          children={(field) => {
            return (
              <Field.Root
                name={field.name}
                invalid={!field.state.meta.isValid}
                dirty={field.state.meta.isDirty}
                touched={field.state.meta.isTouched}>
                <Field.Label>Name</Field.Label>
                <Field.Control
                  value={field.state.value}
                  onValueChange={field.handleChange}
                  onBlur={field.handleBlur}
                  placeholder="Name Nameson"
                />
                <Field.Error match={!field.state.meta.isValid}>{field.state.meta.errors.join(',')}</Field.Error>
              </Field.Root>
            );
          }}
        />
        <form.Field
          name="email"
          children={(field) => {
            return (
              <Field.Root
                name={field.name}
                invalid={!field.state.meta.isValid}
                dirty={field.state.meta.isDirty}
                touched={field.state.meta.isTouched}>
                <Field.Label>Email</Field.Label>
                <Field.Control
                  value={field.state.value}
                  onValueChange={field.handleChange}
                  onBlur={field.handleBlur}
                  placeholder="email@example.com"
                />
                <Field.Error match={!field.state.meta.isValid}>{field.state.meta.errors.join(',')}</Field.Error>
              </Field.Root>
            );
          }}
        />
      </div>
      <form.Field
        name="message"
        children={(field) => {
          return (
            <Field.Root
              name={field.name}
              invalid={!field.state.meta.isValid}
              dirty={field.state.meta.isDirty}
              touched={field.state.meta.isTouched}>
              <Field.Label>Message</Field.Label>
              <Field.Control
                value={field.state.value}
                onValueChange={field.handleChange}
                onBlur={field.handleBlur}
                placeholder="Write a message..."
                render={(inputProps) => (
                  <textarea
                    {...inputProps}
                    className={clsx(
                      'h-50 w-full resize-none rounded-md border border-gray-600 bg-transparent p-2 text-gray-900',
                      'focus:outline focus:-outline-offset-1 focus:outline-blue-800',
                      'dark:border-gray-200 dark:text-gray-300 dark:placeholder:text-gray-500'
                    )}
                  />
                )}
              />
              <Field.Error match={!field.state.meta.isValid}>{field.state.meta.errors.join(',')}</Field.Error>
            </Field.Root>
          );
        }}
      />
      <Submit type="submit">Send Message</Submit>
    </form>
  );
}
