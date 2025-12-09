import React from 'react';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className = '', ...props }) => (
  <div className={`flex h-full w-full flex-1 flex-col items-center justify-center gap-8 p-4 ${className}`} {...props}>
    {children}
  </div>
);
