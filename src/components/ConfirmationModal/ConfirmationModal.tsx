import React, { useEffect } from 'react';
import './ConfirmationModal.scss';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  isDanger?: boolean;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
  isDanger = false,
}: ConfirmationModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, isLoading]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  return (
    <div className="ConfirmationModal__backdrop" onClick={handleBackdropClick}>
      <div className="ConfirmationModal__content">
        <div className="ConfirmationModal__header">
          <h2 className="ConfirmationModal__title">{title}</h2>
          <button className="ConfirmationModal__close" onClick={onClose} disabled={isLoading}>
            ×
          </button>
        </div>
        <div className="ConfirmationModal__body">
          <p className="ConfirmationModal__message">{message}</p>
        </div>
        <div className="ConfirmationModal__actions">
          <button
            type="button"
            onClick={onClose}
            className="ConfirmationModal__btn ConfirmationModal__btn--cancel"
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`ConfirmationModal__btn ${isDanger ? 'ConfirmationModal__btn--danger' : 'ConfirmationModal__btn--confirm'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
