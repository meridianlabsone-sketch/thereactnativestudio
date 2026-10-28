import React from 'react';
import { ActivityIndicatorProps } from '../../types/native';

export const ActivityIndicator = React.memo<ActivityIndicatorProps>(
  ({ animating = true, size = 'small', color = '#22c55e', className = '' }) => {
    if (!animating) return null;

    const dimension = size === 'large' ? 'w-8 h-8 border-[3px]' : 'w-4 h-4 border-2';

    return (
      <div
        role="status"
        aria-label="Carregando"
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
      >
        <span
          className={`animate-spin rounded-full border-neutral-700 ${dimension}`}
          style={{
            borderTopColor: color,
            borderRightColor: color,
          }}
        />
      </div>
    );
  }
);

ActivityIndicator.displayName = 'ActivityIndicator';
