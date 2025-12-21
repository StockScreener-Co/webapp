import { Link } from "react-router-dom";
import './HeaderNav.scss';

export const Navigation = () => {
  return (
    <nav className="Navigation">
      <ul className="Navigation__list">
        <li className="Navigation__item">
          <Link to="#features" className='Navigation__link'>Dashboard</Link>
        </li>
        <li className="Navigation__item">
          <Link to="#screener" className='Navigation__link'>Screener</Link>
        </li>
        <li className="Navigation__item">
          <Link to="#pricing" className='Navigation__link'>Portfolios</Link>
        </li>
      </ul>
    </nav>
  );
};
