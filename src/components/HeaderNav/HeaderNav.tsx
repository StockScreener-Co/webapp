import { useState } from 'react';
import { Link } from "react-router-dom";
import { CreatePortfolioModal } from '../CreatePortfolioModal/CreatePortfolioModal';
import './HeaderNav.scss';

export const Navigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePortfolio = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitPortfolio = (portfolioName: string) => {
    console.log('Creating portfolio:', portfolioName);
    // Здесь будет логика создания портфолио
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
      />
    </>
  );
};
