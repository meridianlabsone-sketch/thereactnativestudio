import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  visible: boolean;
  onRequestClose: () => void;
  title?: string;
  children: React.ReactNode;
  animationType?: 'fade' | 'slide';
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onRequestClose,
  title,
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && visible) {
        onRequestClose();
      }
    };
    if (visible) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, onRequestClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onRequestClose}
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-lg bg-[#0a0f0b] border border-[#1d2b20] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#18231b]">
          {title ? (
            <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={onRequestClose}
            aria-label="Fechar modal"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#141d16] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};
