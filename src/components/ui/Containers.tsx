import { HTMLAttributes, ReactNode } from 'react';

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function PageContainer({ children, className = '', ...props }: PageContainerProps) {
  return (
    <div className={`flex h-full w-full flex-1 flex-col items-center justify-center gap-8 p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
