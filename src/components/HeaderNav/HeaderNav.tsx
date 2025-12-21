import { useState } from 'react';
import { Link } from "react-router-dom";
import { CreatePortfolioModal } from '../CreatePortfolioModal/CreatePortfolioModal';
import { createPortfolio } from '../../api/portfolioApi';
import './HeaderNav.scss';

export const Navigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreatePortfolio = () => {
    setIsModalOpen(true);
    setError(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  const handleSubmitPortfolio = async (portfolioName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await createPortfolio(portfolioName);
      setIsModalOpen(false);
      // Можно добавить уведомление об успешном создании
      console.log('Portfolio created successfully:', portfolioName);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create portfolio');
      console.error('Error creating portfolio:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav className="Navigation">
        <ul className="Navigation__list">
          <li className="Navigation__item">
            <Link to="#features" className='Navigation__link'>Dashboard</Link>
          </li>
          <li className="Navigation__item">
            <Link to="#screener" className='Navigation__link'>Screener</Link>
          </li>
          <li className="Navigation__item Navigation__item--dropdown">
            <Link to="#pricing" className='Navigation__link'>Portfolios</Link>
            <div className="Navigation__dropdown">
              <button 
                className="Navigation__dropdown-item"
                onClick={handleCreatePortfolio}
              >
                Create Portfolio
              </button>
            </div>
          </li>
        </ul>
      </nav>
      <CreatePortfolioModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitPortfolio}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};
