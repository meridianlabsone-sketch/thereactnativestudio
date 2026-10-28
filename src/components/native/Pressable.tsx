import React, { useState, useCallback } from 'react';
import { PressableProps } from '../../types/native';

export const Pressable = React.memo<PressableProps>(
  ({
    children,
    onPress,
    disabled = false,
    activeOpacity = 0.75,
    accessibilityLabel,
    accessibilityRole = 'button',
    className = '',
    type = 'button',
  }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleMouseDown = useCallback(() => {
      if (!disabled) setIsPressed(true);
    }, [disabled]);

    const handleMouseUp = useCallback(() => {
      setIsPressed(false);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsPressed(false);
    }, []);

    const handleClick = useCallback(() => {
      if (!disabled && onPress) {
        onPress();
      }
    }, [disabled, onPress]);

    return (
      <button
        type={type}
        role={accessibilityRole}
        aria-label={accessibilityLabel}
        disabled={disabled}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchCancel={handleMouseLeave}
        style={{
          opacity: isPressed ? activeOpacity : 1,
          transform: isPressed ? 'scale(0.98)' : 'scale(1)',
          transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.1s ease',
        }}
        className={`select-none outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
          disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
        } ${className}`}
      >
        {typeof children === 'function' ? children({ pressed: isPressed }) : children}
      </button>
    );
  }
);

Pressable.displayName = 'Pressable';
