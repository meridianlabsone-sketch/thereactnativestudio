import React from 'react';
import { ViewProps } from '../../types/native';

export const SafeAreaView = React.forwardRef<HTMLDivElement, ViewProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col w-full min-h-screen pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] pl-[env(safe-area-inset-left,0px)] pr-[env(safe-area-inset-right,0px)] ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SafeAreaView.displayName = 'SafeAreaView';
