'use client';

import { Toast } from '@base-ui-components/react/toast';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

function Toasts() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => {
    const isSuccess = toast.type === 'success';
    const isError = toast.type === 'error';

    return (
      <Toast.Root
        key={toast.id}
        toast={toast}
        className={clsx(
          'absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] mr-0 h-(--height) w-full origin-bottom',
          'transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]',
          'rounded-lg border p-4 shadow-lg select-none',
          '[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))]',
          '[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]',
          '[--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]',
          '[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]',
          "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
          'data-ending-style:opacity-0 data-limited:opacity-0 data-starting-style:transform-[translateY(150%)]',
          'data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]',
          'data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
          'data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
          'data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]',
          '[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(150%)]',
          isSuccess && 'border-green-200 bg-green-50 bg-clip-padding dark:border-green-800 dark:bg-green-950',
          isError && 'border-red-200 bg-red-50 bg-clip-padding dark:border-red-800 dark:bg-red-950',
          !isSuccess && !isError && 'border-gray-200 bg-gray-50 bg-clip-padding dark:border-gray-800 dark:bg-gray-950'
        )}>
        <Toast.Content className="overflow-hidden transition-opacity duration-250">
          <Toast.Title className="text-[0.975rem] leading-5 font-medium" />
          <Toast.Description
            className={clsx(
              'text-[0.925rem] leading-5',
              isSuccess && 'text-green-700 dark:text-green-300',
              isError && 'text-red-700 dark:text-red-300',
              !isSuccess && !isError && 'text-gray-700 dark:text-gray-300'
            )}
          />
          <div
            className={clsx(
              'mt-2 rounded-md p-3 py-2 text-xs font-medium select-text',
              isSuccess && 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100',
              isError && 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100',
              !isSuccess && !isError && 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100'
            )}
            data-swipe-ignore>
            <pre className="whitespace-pre-wrap">{JSON.stringify(toast.data, null, 2)}</pre>
          </div>
          <Toast.Close
            className={clsx(
              'absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded border-none bg-transparent',
              isSuccess &&
                'text-green-500 hover:bg-green-100 hover:text-green-700 dark:text-green-400 dark:hover:bg-green-900 dark:hover:text-green-200',
              isError &&
                'text-red-500 hover:bg-red-100 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900 dark:hover:text-red-200',
              !isSuccess &&
                !isError &&
                'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-200'
            )}
            aria-label="Close">
            <X className="size-4" />
          </Toast.Close>
        </Toast.Content>
      </Toast.Root>
    );
  });
}

export function ToastProvider(props: { children: ReactNode }) {
  return (
    <Toast.Provider limit={1}>
      {props.children}
      <Toast.Portal>
        <Toast.Viewport className="fixed top-auto right-4 bottom-4 z-10 mx-auto flex w-[250px] sm:right-8 sm:bottom-8 sm:w-[360px]">
          <Toasts />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

export const useToastManager = Toast.useToastManager;
