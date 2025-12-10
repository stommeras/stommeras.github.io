import { Field } from '@base-ui-components/react/field';
import clsx from 'clsx';
import * as React from 'react';

export function Root({ className, ...props }: Field.Root.Props) {
  return <Field.Root className={clsx('flex flex-1 flex-col items-start gap-1', className)} {...props} />;
}

export function Label({ className, ...props }: Field.Label.Props) {
  return (
    <Field.Label
      className={clsx(
        'text-sm font-medium text-gray-700 dark:text-gray-300',
        'has-[[role="checkbox"]]:flex has-[[role="checkbox"]]:items-center has-[[role="checkbox"]]:gap-2',
        'has-[[role="radio"]]:flex has-[[role="radio"]]:items-center has-[[role="radio"]]:gap-2 has-[[role="radio"]]:font-normal',
        'has-[[role="switch"]]:flex has-[[role="switch"]]:items-center',
        className
      )}
      {...props}
    />
  );
}

export function Description({ className, ...props }: Field.Description.Props) {
  return <Field.Description className={clsx('text-sm text-gray-600 dark:text-gray-400', className)} {...props} />;
}

export const Control = React.forwardRef<HTMLInputElement, Field.Control.Props>(function FieldControl(
  { className, ...props }: Field.Control.Props,
  forwardedRef: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <Field.Control
      ref={forwardedRef}
      className={clsx(
        'h-10 w-full rounded-md border bg-transparent pl-3.5 text-base',
        'border-gray-700 text-gray-900 placeholder:text-gray-400',
        'dark:border-gray-200 dark:text-gray-100 dark:placeholder:text-gray-500',
        'focus:outline focus:-outline-offset-1 focus:outline-blue-800 dark:focus:outline-blue-500',
        className
      )}
      {...props}
    />
  );
});

export function Error({ className, ...props }: Field.Error.Props) {
  return <Field.Error className={clsx('text-sm text-red-800 dark:text-red-400', className)} {...props} />;
}

export function Item(props: Field.Item.Props) {
  return <Field.Item {...props} />;
}
