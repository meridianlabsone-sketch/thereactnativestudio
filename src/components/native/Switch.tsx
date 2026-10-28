import React, { useCallback } from 'react';
import { SwitchProps } from '../../types/native';

export const Switch = React.memo<SwitchProps>(
  ({ value, onValueChange, disabled = false, accessibilityLabel = 'Alternar switch', className = '' }) => {
    const handleToggle = useCallback(() => {
      if (!disabled) {
        onValueChange(!value);
      }
    }, [disabled, onValueChange, value]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleToggle();
        }
      },
      [handleToggle]
    );

    return (
      <button
        type="button"
        role="switch"
        aria-checked={value}
        aria-label={accessibilityLabel}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
          disabled ? 'opacity-40 cursor-not-allowed' : ''
        } ${value ? 'bg-[#22c55e]' : 'bg-[#1e2721]'} ${className}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            value ? 'translate-x-5 bg-white' : 'translate-x-0 bg-neutral-300'
          }`}
        />
      </button>
    );
  }
);

Switch.displayName = 'Switch';
