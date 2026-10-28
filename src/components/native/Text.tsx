import React from 'react';
import { TextProps } from '../../types/native';

const variantClasses: Record<NonNullable<TextProps['variant']>, string> = {
  h1: 'text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight',
  h2: 'text-xl md:text-2xl font-bold tracking-tight text-white leading-snug',
  h3: 'text-lg font-semibold tracking-normal text-white',
  body: 'text-sm md:text-base text-neutral-300 leading-relaxed',
  caption: 'text-xs text-neutral-400 font-medium',
  mono: 'font-mono text-xs md:text-sm text-neutral-300 tabular-nums',
};

export const Text = React.memo<TextProps>(
  ({
    children,
    className = '',
    variant = 'body',
    numberOfLines,
    accessibilityRole,
    accessibilityLabel,
    ...props
  }) => {
    const lineClampStyle = numberOfLines
      ? {
          display: '-webkit-box',
          WebkitLineClamp: numberOfLines,
          WebkitBoxOrient: 'vertical' as const,
          overflow: 'hidden',
        }
      : undefined;

    return (
      <p
        role={accessibilityRole}
        aria-label={accessibilityLabel}
        style={lineClampStyle}
        className={`${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = 'Text';
