import React, { useState, useCallback } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { TextInputProps } from '../../types/native';

export const TextInput = React.memo<TextInputProps>(
  ({
    value,
    defaultValue = '',
    onChangeText,
    placeholder = '',
    secureTextEntry = false,
    keyboardType = 'default',
    multiline = false,
    numberOfLines = 3,
    maxLength,
    editable = true,
    clearButtonMode = 'while-editing',
    label,
    helperText,
    errorText,
    leftIcon,
    rightIcon,
    accessibilityLabel,
    className = '',
    autoFocus = false,
    onFocus,
    onBlur,
    onSubmitEditing,
  }) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const [isSecure, setIsSecure] = useState(secureTextEntry);

    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const text = e.target.value;
        if (maxLength && text.length > maxLength) return;
        setInternalValue(text);
        if (onChangeText) {
          onChangeText(text);
        }
      },
      [maxLength, onChangeText]
    );

    const handleClear = useCallback(() => {
      setInternalValue('');
      if (onChangeText) {
        onChangeText('');
      }
    }, [onChangeText]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !multiline && onSubmitEditing) {
          e.preventDefault();
          onSubmitEditing();
        }
      },
      [multiline, onSubmitEditing]
    );

    const showClearButton =
      clearButtonMode === 'always' ||
      (clearButtonMode === 'while-editing' && currentValue.length > 0 && isFocused);

    const inputType = secureTextEntry
      ? isSecure
        ? 'password'
        : 'text'
      : keyboardType === 'email-address'
      ? 'email'
      : keyboardType === 'numeric' || keyboardType === 'phone-pad'
      ? 'tel'
      : 'text';

    return (
      <div className={`flex flex-col gap-1.5 w-full ${className}`}>
        {/* Minimal Label */}
        {label && (
          <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-neutral-400 uppercase select-none px-0.5">
            <span>{label}</span>
            {maxLength && (
              <span className="text-neutral-600 tabular-nums">
                {currentValue.length}/{maxLength}
              </span>
            )}
          </div>
        )}

        {/* Minimalist Input Container */}
        <div
          className={`relative flex items-center w-full rounded-lg transition-all duration-150 ease-out border ${
            errorText
              ? 'border-red-500/80 bg-red-950/10'
              : isFocused
              ? 'border-[#22c55e] bg-[#0c120e] shadow-[0_0_15px_rgba(34,197,94,0.12)]'
              : 'border-white/10 bg-[#090b0a] hover:border-white/20'
          } ${!editable ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          {leftIcon && (
            <div className="pl-3.5 pr-1 text-neutral-500 flex items-center justify-center shrink-0">
              {leftIcon}
            </div>
          )}

          {multiline ? (
            <textarea
              value={currentValue}
              onChange={handleChange}
              rows={numberOfLines}
              placeholder={placeholder}
              disabled={!editable}
              autoFocus={autoFocus}
              aria-label={accessibilityLabel || label}
              onFocus={() => {
                setIsFocused(true);
                onFocus?.();
              }}
              onBlur={() => {
                setIsFocused(false);
                onBlur?.();
              }}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-white px-3.5 py-3 text-sm outline-none resize-none placeholder:text-neutral-600 font-sans leading-relaxed"
            />
          ) : (
            <input
              type={inputType}
              value={currentValue}
              onChange={handleChange}
              placeholder={placeholder}
              disabled={!editable}
              autoFocus={autoFocus}
              aria-label={accessibilityLabel || label}
              onFocus={() => {
                setIsFocused(true);
                onFocus?.();
              }}
              onBlur={() => {
                setIsFocused(false);
                onBlur?.();
              }}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-white px-3.5 py-2.5 text-sm outline-none placeholder:text-neutral-600 font-sans"
            />
          )}

          <div className="flex items-center gap-1.5 pr-3 shrink-0">
            {showClearButton && editable && (
              <button
                type="button"
                onClick={handleClear}
                tabIndex={-1}
                aria-label="Limpar campo"
                className="w-5 h-5 rounded flex items-center justify-center text-neutral-500 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {secureTextEntry && (
              <button
                type="button"
                onClick={() => setIsSecure(!isSecure)}
                aria-label={isSecure ? 'Exibir senha' : 'Ocultar senha'}
                className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-[#22c55e] transition-colors"
              >
                {isSecure ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5 text-[#22c55e]" />
                )}
              </button>
            )}

            {rightIcon && !secureTextEntry && (
              <div className="text-neutral-500 flex items-center">{rightIcon}</div>
            )}
          </div>
        </div>

        {errorText ? (
          <p className="text-[11px] text-red-400 font-mono px-0.5">{errorText}</p>
        ) : helperText ? (
          <p className="text-[11px] text-neutral-500 font-sans px-0.5">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
