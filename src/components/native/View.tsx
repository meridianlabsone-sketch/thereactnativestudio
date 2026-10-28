import React from 'react';
import { ViewProps } from '../../types/native';

export const View = React.forwardRef<HTMLDivElement, ViewProps>(
  ({ children, className = '', accessibilityRole, accessibilityLabel, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role={accessibilityRole}
        aria-label={accessibilityLabel}
        className={`flex flex-col relative shrink-0 box-border ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

View.displayName = 'View';
