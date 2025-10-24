import { Link } from "react-router-dom";
import './HeaderNav.scss';

export const Navigation = () => {
  return (
    <nav className="Navigation">
      <ul className="Navigation__list">
        <li className="Navigation__item">
          <Link to="" className='Navigation__link'>Features</Link>
        </li>
        <li className="Navigation__item">
          <Link to="" className='Navigation__link'>Tracking</Link>
        </li>
        <li className="Navigation__item">
          <Link to="" className='Navigation__link'>Dividends</Link>
        </li>
        <li className="Navigation__item">
          <Link to="" className='Navigation__link'>Tools</Link>
        </li>
        <li className="Navigation__item">
          <Link to="" className='Navigation__link'>Community</Link>
        </li>
        <li className="Navigation__item">
          <Link to="" className='Navigation__link'>Pricing</Link>
        </li>
      </ul>
    </nav>
  );
};
