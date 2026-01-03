import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '../HeaderNav/HeaderNav';
import { useAuth } from '../../context/AuthContext';
import './Header.scss';

export const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
            {isLoggedIn ? (
              <button className='Header__logout' onClick={handleLogout}>Log out</button>
            ) : (
              <Link to="/login" className='Header__login'>Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}