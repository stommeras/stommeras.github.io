import { HTMLAttributes, ReactNode } from 'react';

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function PageContainer({ children, className = '', ...props }: PageContainerProps) {
  return (
    <div className={`flex w-full grow flex-col items-center justify-center gap-8 p-8 ${className}`} {...props}>
      {children}
    </div>
  );
}
