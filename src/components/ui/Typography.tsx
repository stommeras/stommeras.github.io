import { HTMLAttributes } from 'react';

export function Title({ children, className = '', ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={`text-center text-4xl md:text-6xl ${className}`} {...props}>
      {children}
    </h1>
  );
}

export function Subtitle({ children, className = '', ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={`text-center text-2xl md:text-4xl ${className}`} {...props}>
      {children}
    </h2>
  );
}
