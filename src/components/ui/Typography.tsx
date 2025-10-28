import React from 'react';

export const Title = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={`text-center text-4xl md:text-6xl ${className}`} {...props}>
    {children}
  </h1>
);

export const Subtitle = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={`text-center text-2xl md:text-4xl ${className}`} {...props}>
    {children}
  </h2>
);
