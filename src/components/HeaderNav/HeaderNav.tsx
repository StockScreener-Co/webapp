import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { CreatePortfolioModal } from '../CreatePortfolioModal/CreatePortfolioModal';
import { createPortfolio, getMyPortfolios, Portfolio } from '../../api/portfolioApi';
import './HeaderNav.scss';

export const Navigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoadingPortfolios, setIsLoadingPortfolios] = useState(false);

  const handleCreatePortfolio = () => {
    setIsModalOpen(true);
    setError(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    setIsLoadingPortfolios(true);
    try {
      const data = await getMyPortfolios();
      setPortfolios(data);
    } catch (err) {
      console.error('Error loading portfolios:', err);
      // Не показываем ошибку пользователю, просто логируем
    } finally {
      setIsLoadingPortfolios(false);
    }
  };

  const handleSubmitPortfolio = async (portfolioName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await createPortfolio(portfolioName);
      setIsModalOpen(false);
      // Обновляем список портфолио после создания
      await loadPortfolios();
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
            <Link to="/portfolio" className='Navigation__link'>Portfolios</Link>
            <div className="Navigation__dropdown">
              {isLoadingPortfolios ? (
                <div className="Navigation__dropdown-loading">Loading...</div>
              ) : portfolios.length > 0 ? (
                portfolios.map((portfolio) => (
                  <Link
                    key={portfolio.id || portfolio.name}
                    to="/portfolio"
                    className="Navigation__dropdown-item"
                  >
                    {portfolio.name}
                  </Link>
                ))
              ) : (
                <div className="Navigation__dropdown-empty">No portfolios yet</div>
              )}
              <div className="Navigation__dropdown-divider"></div>
              <button 
                className="Navigation__dropdown-item Navigation__dropdown-item--create"
                onClick={handleCreatePortfolio}
              >
                + Create Portfolio
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
