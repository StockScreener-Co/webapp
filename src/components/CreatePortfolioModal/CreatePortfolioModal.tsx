import { useState, useEffect } from 'react';
import './CreatePortfolioModal.scss';

interface CreatePortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (portfolioName: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export const CreatePortfolioModal = ({ isOpen, onClose, onSubmit, isLoading = false, error }: CreatePortfolioModalProps) => {
  const [portfolioName, setPortfolioName] = useState('');

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

  useEffect(() => {
    if (!isOpen) {
      setPortfolioName('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (portfolioName.trim() && !isLoading) {
      onSubmit(portfolioName.trim());
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="CreatePortfolioModal__backdrop" onClick={handleBackdropClick}>
      <div className="CreatePortfolioModal__content">
        <div className="CreatePortfolioModal__header">
          <h2 className="CreatePortfolioModal__title">Create Portfolio</h2>
          <button className="CreatePortfolioModal__close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="CreatePortfolioModal__form">
          <div className="CreatePortfolioModal__field">
            <label htmlFor="portfolio-name" className="CreatePortfolioModal__label">
              Portfolio Name
            </label>
            <input
              id="portfolio-name"
              type="text"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              className="CreatePortfolioModal__input"
              placeholder="Enter portfolio name"
              autoFocus
              disabled={isLoading}
            />
            {error && (
              <div className="CreatePortfolioModal__error">
                {error}
              </div>
            )}
          </div>
          <div className="CreatePortfolioModal__actions">
            <button
              type="button"
              onClick={onClose}
              className="CreatePortfolioModal__btn CreatePortfolioModal__btn--cancel"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="CreatePortfolioModal__btn CreatePortfolioModal__btn--submit"
              disabled={!portfolioName.trim() || isLoading}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

