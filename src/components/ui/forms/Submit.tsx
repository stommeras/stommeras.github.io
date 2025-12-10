import { Button } from '@base-ui-components/react/button';
import clsx from 'clsx';

export function Submit({ className, ...props }: Button.Props) {
  return (
    <Button
      className={clsx(
        'font-inherit m-0 flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base leading-6 font-medium text-gray-900 outline-0 select-none hover:bg-gray-100 focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:border-t-gray-300 active:bg-gray-200 active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] data-disabled:text-gray-500 hover:data-disabled:bg-gray-50 active:data-disabled:border-t-gray-200 active:data-disabled:bg-gray-50 active:data-disabled:shadow-none',
        className
      )}
      {...props}
    />
  );
}
