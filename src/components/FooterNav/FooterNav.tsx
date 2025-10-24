import { Link } from 'react-router-dom';

import './FooterNav.scss';

export const FooterNav = () => {
  return (
    <div className="FooterNav">
      <nav className="FooterNav__section" aria-label="Product">
        <h3 className="FooterNav__title">Product</h3>
        <ul className="FooterNav__list">
          <li className="FooterNav__item">
            <Link className="FooterNav__link" to="">Portfolio tracker</Link>
          </li>
          <li className="FooterNav__item">
            <Link className="FooterNav__link" to="">Stock tracker</Link>
          </li>
          <li className="FooterNav__item">
            <Link className="FooterNav__link" to="">Dividend tracker</Link>
          </li>
          <li className="FooterNav__item">
            <Link className="FooterNav__link" to="">Dividend calendar</Link>
          </li>
          <li className="FooterNav__item">
            <Link className="FooterNav__link" to="">Sharesight vs. Dividend Watch vs. Snowball Analytics</Link>
          </li>
          <li className="FooterNav__item">
            <Link className="FooterNav__link" to="">Pricing</Link>
          </li>
        </ul>
      </nav>

      <nav className="FooterNav__section" aria-label="Resources">
        <h3 className="FooterNav__title">Resources</h3>
        <ul className="FooterNav__list">
          <li className="FooterNav__item">
            <Link className="FooterNav__link" to="">Terms and conditions</Link>
          </li>
          <li className="FooterNav__item">
            <Link className="FooterNav__link" to="">Privacy policy</Link>
          </li>
          <li className="FooterNav__item">
            <Link className="FooterNav__link" to="">Security</Link>
          </li>
          <li className="FooterNav__item">
            <Link className="FooterNav__link" to="">Yodlee</Link>
          </li>
          <li className="FooterNav__item">
            <Link className="FooterNav__link" to="">About us</Link>
          </li>
          <li className="FooterNav__item">
            <Link className="FooterNav__link" to="">Contacts</Link>
          </li>
        </ul>
      </nav>

      <nav className="FooterNav__section" aria-label="Support">
        <h3 className="FooterNav__title">Support</h3>
        <ul className="FooterNav__list">
          <li className="FooterNav__item">
            <Link className="FooterNav__link" to="">Support</Link>
          </li>
          <li className="FooterNav__item">
            <Link className="FooterNav__link" to="">Knowledge Base</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
