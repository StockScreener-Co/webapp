import { useState, useEffect } from 'react';
import './CreatePortfolioModal.scss';

interface CreatePortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (portfolioName: string) => void;
}

export const CreatePortfolioModal = ({ isOpen, onClose, onSubmit }: CreatePortfolioModalProps) => {
  const [portfolioName, setPortfolioName] = useState('');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (portfolioName.trim()) {
      onSubmit(portfolioName.trim());
      setPortfolioName('');
      onClose();
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
            />
          </div>
          <div className="CreatePortfolioModal__actions">
            <button
              type="button"
              onClick={onClose}
              className="CreatePortfolioModal__btn CreatePortfolioModal__btn--cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="CreatePortfolioModal__btn CreatePortfolioModal__btn--submit"
              disabled={!portfolioName.trim()}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

