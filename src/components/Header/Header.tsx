import { Link } from 'react-router-dom';
import { Navigation } from '../HeaderNav/HeaderNav';
import './Header.scss';

export const Header = () => {
  return (
    <header className='Header'>
      <div className='container'>
        <div className='Header__container'>
          <Link to="/" className='Header__logo'>
            <div className='Header__logo-icon'>SS</div>
            <span className='Header__logo-text'>StockScreener</span>
          </Link>
          <Navigation />
          <div className='Header__actions'>
            <button className='Header__logout'>Log out</button>
          </div>
        </div>
      </div>
    </header>
  )
}