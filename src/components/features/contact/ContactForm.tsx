/* eslint-disable react/no-children-prop */
'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { revalidateLogic, useForm } from '@tanstack/react-form';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

export interface ContactFormData {
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
  const t = useTranslations('contact');
  const { isPending, mutate } = useFormSubmit();

  const contactFormSchema = z.object({
    name: z.string().min(2, t('validation.name.min')).max(100, t('validation.name.max')),
    email: z.email(t('validation.email.invalid')),
    message: z.string().min(10, t('validation.message.min')).max(1000, t('validation.message.max')),
  });

  const form = useForm({
    defaultValues,
    onSubmit: ({ value: formValues }) => {
      mutate(formValues, {
        onSuccess: () => form.reset(),
      });
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: contactFormSchema,
    },
  });

  return (
    <form
      aria-label={t('ariaLabel')}
      className="flex w-full flex-col items-end gap-4"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}>
      <FieldGroup>
        <div className="flex flex-col gap-4 md:flex-row">
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>{t('form.name.label')}</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder={t('form.name.placeholder')}
                      autoComplete="off"
                    />
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>{t('form.email.label')}</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder={t('form.email.placeholder')}
                      autoComplete="off"
                    />
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </div>
        <form.Field
          name="message"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>{t('form.message.label')}</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t('form.message.placeholder')}
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={isInvalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {t('form.characterCounter', { count: field.state.value.length })}
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>
      <Button type="submit" className="max-w-fit" variant="default" disabled={isPending}>
        {isPending ? (
          <span className="flex items-center gap-2">
            <Spinner />
            {t('form.submitting')}
          </span>
        ) : (
          t('form.submit')
        )}
      </Button>
    </form>
  );
}
