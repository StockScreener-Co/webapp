import "./Footer.scss";

export const Footer = () => {
  return (
    <footer className="Footer">
      <div className="container">
        <div className="Footer__container">
          <span className="Footer__copyright">© 2025 StockScreener. All rights reserved.</span>
          <div className="Footer__links">
            <a href="#" className="Footer__link">Privacy</a>
            <a href="#" className="Footer__link">Terms</a>
            <a href="#" className="Footer__link">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
