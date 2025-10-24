import { Link } from 'react-router-dom';
import { Navigation } from '../HeaderNav/HeaderNav';
import './Header.scss';

export const Header = () => {
  return (
    <header className='Header'>
      <div className='container'>
        <div className='Header__container'>
          <Link to="/" className='Header__logo'>TickerScreener</Link>
          <Navigation />
          <ul className='Header__auth'>
            <li className='Header__item'>
              <Link to="" className='Header__sign-in'>Sign in</Link>
            </li>
            <li className='Header__item'>
              <Link to="" className='Header__start'>Start for free</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}