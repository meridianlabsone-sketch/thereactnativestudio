import React from 'react';

export interface ScrollViewProps extends React.HTMLAttributes<HTMLDivElement> {
  horizontal?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  contentContainerClassName?: string;
  children?: React.ReactNode;
}

export const ScrollView = React.forwardRef<HTMLDivElement, ScrollViewProps>(
  (
    {
      children,
      horizontal = false,
      showsHorizontalScrollIndicator = true,
      showsVerticalScrollIndicator = true,
      contentContainerClassName = '',
      className = '',
      ...props
    },
    ref
  ) => {
    const scrollClasses = horizontal
      ? `flex flex-row overflow-x-auto overflow-y-hidden ${
          !showsHorizontalScrollIndicator ? 'scrollbar-none' : ''
        }`
      : `flex flex-col overflow-y-auto overflow-x-hidden ${
          !showsVerticalScrollIndicator ? 'scrollbar-none' : ''
        }`;

    return (
      <div
        ref={ref}
        className={`${scrollClasses} overscroll-contain ${className}`}
        {...props}
      >
        <div className={`flex ${horizontal ? 'flex-row' : 'flex-col'} ${contentContainerClassName}`}>
          {children}
        </div>
      </div>
    );
  }
);

ScrollView.displayName = 'ScrollView';
